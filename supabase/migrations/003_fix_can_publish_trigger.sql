-- Allow service role (admin approval) to update can_publish.
-- The previous trigger checked request.jwt.claim.role, which is not set for
-- Supabase service-role clients, so approvals appeared to succeed but were reverted.

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
