export const getRepos = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/vnd.github+json');
    myHeaders.append(
      'Authorization',
      `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    );
    myHeaders.append('X-GitHub-Api-Version', '2022-11-28');
    const requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const response = await fetch(
      'https://api.github.com/users/Daniel235-web/repos?per_page=20&page=1&type=owner&sort=pushed&direction=desc',
      requestOptions,
    );
    const json: any = await response.json();
    if (json?.length > 0) {
      json.sort(
        (a: any, b: any) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
      const formatArr = json?.map((item: any) => ({
        id: item.id,
        name: item.name,
        updated_at: item.updated_at,
        html_url: item?.html_url,
        description: item?.description,
        topics: item?.topics,
        created_at: new Date(item?.created_at)?.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      }));
      return formatArr;
    }
  } catch (error) {
    return [];
  }
};
