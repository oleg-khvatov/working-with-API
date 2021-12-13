(async() => {
	const $body = document.body;
	$body.classList.add('bg-info', 'text-white');
	const basisTemplate = `
		<div class="container">
			<h1 class="text-center font-italic mb-4">Список Статей</h1>
			<ul class="mb-5"></ul>
			<h2 class="text-center font-italic">Постраничная Навигация</h2>
			<nav></nav>
		</div>
	`;

	const secondTemplate = `
		<div class="container">
			<h1 class="text-center font-italic mb-4">Список Статей</h1>
			<ul class="mb-5"></ul>
			<h2 class="text-center font-italic">Постраничная Навигация</h2>
			<nav></nav>
		</div>
	`;
	
	const pageParams = new URLSearchParams(window.location.search);
	const page = pageParams.get('page');
	const id = pageParams.get('id');
	console.log('Пагинация:', page, 'ID статьи:', id);

	createFromTemplate($body, basisTemplate);
	const $ul = document.querySelector('ul');
	const $nav = document.querySelector('nav');
	let currentList;
	
	if (!page) {
		currentList = await loadList();
	} else {
		currentList = await loadList(page);
	}


	console.log(currentList, typeof(currentList));
	render(currentList, $nav);
	
	async function loadList(number = 1) {
		const response = await fetch(`https://gorest.co.in/public-api/posts?page=${number}`);
		const findings = await response.json();
		return findings;
	}

	function render(list, nav) {
		for (let i = 0; i < list.data.length; i++) {
			const itemTemplate = `
			<li class="mb-2">
				<a href="index2.html?id=${list.data[i].id}" class="text-white">${list.data[i].title}</a>
			</li>
			`;
			createFromTemplate($ul, itemTemplate);
		}

		for (let i = 1; i <= list.meta.pagination.pages; i++) {
			const navTemplate = `
				<a href="index.html?page=${i}" class="d-inline-block mr-2 text-white">${i}</a>
			`;
			createFromTemplate(nav, navTemplate);
		}
	}
	
	function createFromTemplate (elem, template) {
		const element = document.createElement('template');
		element.innerHTML = template.trim();
		elem.append(element.content);
		return element.content;
	}
})();