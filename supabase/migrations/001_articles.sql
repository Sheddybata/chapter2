-- Run this in the Supabase SQL Editor for project setup.

create type public.article_series as enum ('origin', 'history', 'potentiality');

create type public.article_status as enum ('draft', 'published');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  display_name text not null,
  avatar_url text,
  can_publish boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  series public.article_series not null,
  cover_image_url text not null,
  author_id uuid not null references public.profiles (id) on delete cascade,
  author_name text not null,
  status public.article_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_series_status_idx on public.articles (series, status);
create index articles_author_id_idx on public.articles (author_id);
create index articles_published_at_idx on public.articles (published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  name text;
begin
  name := coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1), 'Contributor');

  insert into public.profiles (id, full_name, display_name)
  values (new.id, name, name);

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.prevent_can_publish_self_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.can_publish is distinct from old.can_publish then
    if auth.role() is distinct from 'service_role' then
      new.can_publish := old.can_publish;
    end if;
  end if;
  return new;
end;
$$;

create trigger profiles_prevent_can_publish_self_update
before update on public.profiles
for each row execute function public.prevent_can_publish_self_update();

alter table public.profiles enable row level security;
alter table public.articles enable row level security;

create policy "Profiles are readable by owner"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Profiles are updatable by owner"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Published articles are public"
on public.articles
for select
to anon, authenticated
using (status = 'published');

create policy "Authors can read own articles"
on public.articles
for select
to authenticated
using (auth.uid() = author_id);

create policy "Approved authors can insert articles"
on public.articles
for insert
to authenticated
with check (
  auth.uid() = author_id
  and exists (
    select 1
    from public.profiles
    where id = auth.uid() and can_publish = true
  )
);

create policy "Approved authors can update own articles"
on public.articles
for update
to authenticated
using (
  auth.uid() = author_id
  and exists (
    select 1
    from public.profiles
    where id = auth.uid() and can_publish = true
  )
)
with check (auth.uid() = author_id);

create policy "Authors can delete own drafts"
on public.articles
for delete
to authenticated
using (auth.uid() = author_id and status = 'draft');

insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true)
on conflict (id) do nothing;

create policy "Cover images are publicly readable"
on storage.objects
for select
to public
using (bucket_id = 'article-covers');

create policy "Approved authors can upload cover images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'article-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
  and exists (
    select 1
    from public.profiles
    where id = auth.uid() and can_publish = true
  )
);

create policy "Authors can update own cover images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'article-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Authors can delete own cover images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'article-covers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Enable publishing for a contributor from the site:
-- log in as an admin and open /admin/contributors
