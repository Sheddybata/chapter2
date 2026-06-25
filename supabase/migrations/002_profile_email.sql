-- Optional follow-up migration if you already ran 001_articles.sql.
-- Adds email to profiles so the admin contributors page can list accounts.

alter table public.profiles
add column if not exists email text;

update public.profiles as p
set email = u.email
from auth.users as u
where p.id = u.id
  and p.email is distinct from u.email;

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

  insert into public.profiles (id, full_name, display_name, email)
  values (new.id, name, name, new.email);

  return new;
end;
$$;
