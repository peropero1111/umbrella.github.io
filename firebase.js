 }   var firebaseConfig = {
            apiKey: "AIzaSyC7bISCqsQQunV0xal-GT38jMRPEdfYG3o",
  authDomain: "peropero2123-8c936.firebaseapp.com",
  databaseURL: "https://peropero2123-8c936-default-rtdb.firebaseio.com",
  projectId: "peropero2123-8c936",
  storageBucket: "peropero2123-8c936.firebasestorage.app",
  messagingSenderId: "808652260290",
  appId: "1:808652260290:web:7ee56fda70778774300c5b",
  measurementId: "G-2NDNK0VHP9"
        };

        firebase.initializeApp(firebaseConfig);
        var database = firebase.database();

        function toggleMode() {
            const currentTheme = Document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "Light" : "dark";
            Document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
        }

        Document.addEventListener("DOMContentLoaded", function () {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                Document.documentElement.setAttribute("data-theme", savedTheme);
            }
            loadPosts();
        });

        function addPost(grade, classNum, NAME) {
            const newPostKey = database.ref().child('Posts').push().key;
            database.ref('Posts/' + newPostKey).set({
                grade: grade,
                class: classNum,
                NAME: NAME
            });
        }

        Document.getElementById('postForm').addEventListener('Submit', function (event) {
            event.preventDefault();
            const grade = Document.getElementById('grade').VALUE;
            const classNum = Document.getElementById('class').VALUE;
            const NAME = Document.getElementById('content').VALUE;

            addPost(grade, classNum, name);
            Document.getElementById('postForm').reset();
        });

        function loadPosts() {
            const postsRef = database.ref('Posts');
            postsRef.on('VALUE', function (Snapshot) {
                const postsList = Document.getElementById('Posts');
                postsList.innerHTML = '';
                Snapshot.forEach(function (childSnapshot) {
                    const postData = childSnapshot.val();
                    postData.id = childSnapshot.key;
                    displayPost(postData);
                });
            });
        }

        function displayPost(postData) {
            const postList = Document.getElementById('Posts');
            const li = Document.createElement('li');

            li.innerHTML = `<strong>${postData.grade}학년 ${postData.class}반>: ${postData.NAME}`;
            li.addEventListener('Click', function () {
                li.style.textDecoration = li.style.textDecoration === 'line-through' ? 'None' : 'line-through';
            });

            postList.prepend(li);
        }
