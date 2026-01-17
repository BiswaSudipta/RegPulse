-- Create tables
create table documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text,
  file_path text not null,
  status text default 'uploaded', -- uploaded, analyzing, compliant, non_compliant
  risk_score int default 0,
  summary text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table chats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text,
  document_id uuid references documents,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table messages (
  id uuid default gen_random_uuid() primary key,
  chat_id uuid references chats on delete cascade not null,
  role text not null, -- user, assistant
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table documents enable row level security;
alter table chats enable row level security;
alter table messages enable row level security;

-- Documents: Users can only see their own
create policy "Users can view own documents"
  on documents for select
  using ( auth.uid() = user_id );

create policy "Users can insert own documents"
  on documents for insert
  with check ( auth.uid() = user_id );

-- Chats: Users can only see their own
create policy "Users can view own chats"
  on chats for select
  using ( auth.uid() = user_id );

create policy "Users can insert own chats"
  on chats for insert
  with check ( auth.uid() = user_id );

-- Messages: Users can only see messages in their chats
create policy "Users can view messages in own chats"
  on messages for select
  using (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

create policy "Users can insert messages in own chats"
  on messages for insert
  with check (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

-- Storage bucket (Optional via SQL, usually done in dashboard but good to have)
insert into storage.buckets (id, name, public) 
values ('compliance-docs', 'compliance-docs', true)
on conflict (id) do nothing;

create policy "Authenticated users can upload docs"
  on storage.objects for insert
  with check ( bucket_id = 'compliance-docs' and auth.role() = 'authenticated' );

create policy "Users can view own docs"
  on storage.objects for select
  using ( bucket_id = 'compliance-docs' and auth.uid() = owner );
