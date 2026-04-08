alter table if exists user_progress
  add constraint user_progress_user_lesson_unique unique (user_id, lesson_id);

create index if not exists idx_kana_items_script_type on kana_items(script_type);
create index if not exists idx_quiz_results_user_id on quiz_results(user_id);
create index if not exists idx_user_progress_user_id on user_progress(user_id);
