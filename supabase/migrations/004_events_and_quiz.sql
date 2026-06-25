create type public.event_status as enum ('upcoming', 'past');

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date text not null,
  location text not null,
  description text not null,
  status public.event_status not null default 'upcoming',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  options jsonb not null,
  answer text not null,
  explanation text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index events_status_sort_idx on public.events (status, sort_order, created_at desc);
create index quiz_questions_sort_idx on public.quiz_questions (sort_order, created_at);

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create trigger quiz_questions_set_updated_at
before update on public.quiz_questions
for each row execute function public.set_updated_at();

alter table public.events enable row level security;
alter table public.quiz_questions enable row level security;

create policy "Events are publicly readable"
on public.events
for select
to anon, authenticated
using (true);

create policy "Quiz questions are publicly readable"
on public.quiz_questions
for select
to anon, authenticated
using (true);

insert into public.quiz_questions (question, options, answer, explanation, sort_order)
values
  (
    'According to Section 14, what is the primary purpose of government?',
    '["Collecting taxes only", "Security and welfare of the people", "Running political parties", "Controlling the press"]'::jsonb,
    'Security and welfare of the people',
    'Section 14 says the security and welfare of the people shall be the primary purpose of government.',
    1
  ),
  (
    'Which section deals directly with educational objectives?',
    '["Section 15", "Section 18", "Section 22", "Section 24"]'::jsonb,
    'Section 18',
    'Section 18 directs government policy toward equal and adequate educational opportunities.',
    2
  ),
  (
    'What does Section 16A focus on?',
    '["Food security", "Foreign policy", "Mass media", "National anthem"]'::jsonb,
    'Food security',
    'Section 16A was inserted to address food security, including availability, accessibility, and affordability.',
    3
  ),
  (
    'Why is Chapter II often discussed with Section 6(6)(c)?',
    '["Because Section 6(6)(c) creates all political parties", "Because Section 6(6)(c) affects court enforcement of Chapter II", "Because Section 6(6)(c) is about school fees", "Because Section 6(6)(c) removes citizen duties"]'::jsonb,
    'Because Section 6(6)(c) affects court enforcement of Chapter II',
    'Chapter II has constitutional force as directive principles, but Section 6(6)(c) is central to the debate about justiciability.',
    4
  );
