document.getElementById('btn_login').addEventListener('click', (event) => {
	const user = document.getElementById('inp_user').value;
	const password = document.getElementById('inp_pass').value;

	fetch('http://localhost:8080/auth/LogIn', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			user: user,
			password: password,
		}),
	})
		.then((response) => response.text())
		.then((response) => alert(response))
		.catch((err) => {
			alert('Error');
			console.log(err);
		});
});

document.getElementById('btn_signup').addEventListener('click', (event) => {
	const user = document.getElementById('inp_user').value;
	const password = document.getElementById('inp_pass').value;

	fetch('http://localhost:8080/auth/SignUp', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			user: user,
			password: password,
		}),
	})
		.then((response) => response.text())
		.then((response) => alert(response))
		.catch((err) => {
			alert('Error');
			console.log(err);
		});
});

document.getElementById('btn_send').addEventListener('click', (event) => {
	const id = document.getElementById('inp_id').value;
	const grade = document.getElementById('inp_grade').value;
    const met = document.getElementById('slc_crud').value;
    console.log(met)

	switch (met) {
        case 'Create':
            fetch('http://localhost:8080/db/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    grade: grade,
                }),
            })
                .then((response) => response.text())
                .then((response) => alert(response))
                .catch((err) => {
                    alert('Error');
                    console.log(err);
                });
            
            break;
        
        case 'Read':
            fetch(`http://localhost:8080/db/students/${id}`, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response)
                    alert(`Usuario${id ? '' : 's'} obtenido${id ? '' : 's'}`)
                })
                .catch((err) => {
                    alert('Error');
                    console.log(err);
                });
            
            break;
        
        case 'Update':
            fetch(`http://localhost:8080/db/students/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grade: grade,
                }),
            })
                .then((response) => response.text())
                .then((response) => alert(response))
                .catch((err) => {
                    alert('Error');
                    console.log(err);
                });
            
            break;
        
        case 'Delete':
            fetch(`http://localhost:8080/db/students/${id}`, {
                method: 'DELETE',
            })
                .then((response) => response.text())
                .then((response) => alert(response))
                .catch((err) => {
                    alert('Error');
                    console.log(err);
                });
            
            break;
	}
});
