export function optimizedUrl(url, options = 'w_800,q_auto,f_auto') {
  return url.replace('/upload/', `/upload/${options}/`)
}