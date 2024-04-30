const SERVICE_NAME = 'static';

export function getStaticUrl({
  baseUrl,
  path
}: {
  baseUrl: string
  path: string
}): string {
  return `${baseUrl}/_/service/${app.name}/${SERVICE_NAME}/${path}`;
}
