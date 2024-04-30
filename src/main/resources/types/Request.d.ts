export declare interface DefaultCookies {
  enonic_xp_tour?: string
  JSESSIONID?: string
  [key: string]: string|undefined
}

export declare interface DefaultHeaders extends Headers {
  accept?: string
  'accept-charset'?: string
  'accept-encoding'?: string
  'accept-language'?: string
  authorization?: string
  'cache-control'?: string
  connection?: string
  'content-length'?: string
  'content-type'?: string
  cookie?: string
  host?: string
  'if-none-match'?: string
  language?: string
  'sec-ch-ua'?: string
  'sec-ch-ua-mobile'?: string
  'sec-ch-ua-platform'?: string
  'sec-fetch-dest'?: string
  'sec-fetch-mode'?: string
  'sec-fetch-site'?: string
  'sec-fetch-user'?: string
  'upgrade-insecure-requests'?: string
  'user-agent'?: string
  'x-forwarded-for'?: string
  'x-forwarded-host'?: string
  'x-forwarded-proto'?: string
  'x-forwarded-server'?: string
  [lowercaseheadername: string]: string|undefined
}

export declare type Method = 'GET'|'POST'|'HEAD'|'PUT'|'DELETE'|'PATCH'

export declare type Mode = 'edit'|'inline'|'live'|'preview'

export declare type Request<
  T extends Record<string, unknown> = {
    body?: string // Often JSON
    contextPath?: string
    contentType?: string
    cookies?: DefaultCookies
    followRedirects?: boolean
    headers?: DefaultHeaders
    params?: Record<string, string | string[]>
    pathParams?: Record<string, string>
    rawPath?: string
    repositoryId?: string
    remoteAddress?: string
    webSocket?: boolean
  }
> = {
  branch: 'draft'|'master'
  host: string
  method: Method
  mode: Mode
  path: string
  port: string|number
  scheme: string
  url: string
} & T
