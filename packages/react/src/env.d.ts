declare module '*.css';
declare module '*.jpg?url' {
  const url: string;
  export default url;
}
declare module '*.webm?url' {
  const url: string;
  export default url;
}
