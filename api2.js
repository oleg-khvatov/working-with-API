(async() => {
  const $body = document.body;
	$body.classList.add('bg-info', 'text-white');
  const pageParams = new URLSearchParams(window.location.search);
	const id = pageParams.get('id');
  const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const findings = await response.json();
  const responseComment = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
  const findingsComment = await responseComment.json();
  const basis2Template = `
		<div class="container">
			<h1 class="text-center font-italic mb-4">${findings.data.title}</h1>
			<p>${findings.data.body}</p>
		</div>
	`;

  createFromTemplate($body, basis2Template);
  const $container = document.querySelector('.container');
  
  if (findingsComment.data.length > 0) {
    for (i = 0; i < findingsComment.data.length; i++) {
      const commentTemplate = `
        <p>${findingsComment.data[i].name} : ${findingsComment.data[i].body}</p>
      `;
      createFromTemplate($container, commentTemplate);
    }
  }

  function createFromTemplate (elem, template) {
		const element = document.createElement('template');
		element.innerHTML = template.trim();
		elem.append(element.content);
		return element.content;
	}
})();