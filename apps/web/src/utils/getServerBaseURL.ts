export function getServerBaseURL() {
  const serverBaseURL = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!serverBaseURL) {
    throw new Error('NEXT_PUBLIC_SERVER_URL is not defined');
  }

  return serverBaseURL;
}
