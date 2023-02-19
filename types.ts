type AccessType = 'all' | 'logged_in' | 'acl';

type AppMode =
  | 'api'
  | 'jupyter-static'
  | 'python-api'
  | 'python-bokeh'
  | 'python-dash'
  | 'python-fastapi'
  | 'python-streamlit'
  | 'python-shiny'
  | 'quarto-shiny'
  | 'quarto-static'
  | 'rmd-shiny'
  | 'rmd-static'
  | 'shiny'
  | 'static'
  | 'tensorflow-saved-model';

type ContentCategory = '' | 'plot' | 'pin' | 'site';

type Role = 'owner' | 'editor' | 'viewer' | 'none';

export interface ContentItem {
  guid: string;
  name: string;
  title: string;
  description: string;
  access_type: AccessType;
  connection_timeout: number;
  read_timeout: number;
  init_timeout: number;
  idle_timeout: number;
  max_processes: number;
  min_processes: number;
  max_conns_per_process: number;
  load_factor: number;
  created_time: Date;
  last_deployed_time: Date;
  bundle_id: string;
  app_mode: AppMode;
  content_category: ContentCategory;
  parameterized: boolean;
  cluster_name: 'Local' | null;
  image_name: 'Local' | null;
  r_version: null | string;
  py_version: null | string;
  quarto_version: null | string;
  run_as: string;
  run_as_current_user: boolean;
  owner_guid: string;
  content_url: string;
  dashboard_url: string;
  role: Role;
  id: string;
}
