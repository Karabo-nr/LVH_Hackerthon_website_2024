
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyAmfC2pEUrToIahPxEwHUcf5w35digazzs",
        authDomain: "limphack-f98fd.firebaseapp.com",
        databaseURL: "https://limphack-f98fd-default-rtdb.firebaseio.com",
        projectId: "limphack-f98fd",
        storageBucket: "limphack-f98fd.appspot.com",
        messagingSenderId: "291693080426",
        appId: "1:291693080426:web:6d0fbb7bbb5766ebbf7f13"
      };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    const auth =  firebase.auth();
    const db = firebase.database();
    

    //signup function
    function signUp()
    {
        //var btn = document.getElementById("btn");
        //document.getElementById("loader").style.display = "block";

        swal("Registering hacker, please wait...", {
            closeOnClickOutside: false,
            closeOnEsc: false,
            buttons: false,
            icon: "info"
        });

        let email = "";
        email = document.getElementById("email").value;

        console.log(email);
        auth.createUserWithEmailAndPassword(email,"default123limphack")
        .then((userCreds) =>
        {
            if (userCreds == null)
                window.location.href = 'https://lah.web.app/studentId-exist.html';
            else
            {
                console.log(userCreds);
                sendEmail(email);
            }
        })
        .catch((error) =>
        {
            swal.close();

            swal(error.message, {
                closeOnClickOutside: false,
                closeOnEsc: false,
                button: "OK",
                icon: "info"
            });
        });
    }
  
    //sendEmail function
    function  sendEmail(email)
    {
        auth.sendPasswordResetEmail(email)
        .then(()=>
        {
            console.log("password reset email sent");
            registerHacker();
        });
    }

    function registerHacker()
    {
            let dept = "";
        dept = document.getElementById("department").value;
        if (dept == "other")
            dept = document.getElementById("other").value;

        db.ref("hackers").child(document.getElementById("id").value).set({
                                                                            id: document.getElementById("id").value,
                                                                            studentNumber: document.getElementById("studentnum").value,
                                                                            name: document.getElementById("name").value,
                                                                            surname: document.getElementById("surname").value,
                                                                            institution: document.getElementById("institution").value,
                                                                            gender: document.getElementById("gender").value,
                                                                            age: document.getElementById("age").value,
                                                                            email: document.getElementById("email").value,
                                                                            department: dept,
                                                                            level: document.getElementById("level").value,
                                                                            role: document.getElementById("role").value,
                                                                            verified: false,   
                                                                        }, (error) =>
                                                                        {
                                                                            if (error)
                                                                                alert(error.message);
                                                                            else
                                                                            {
                                                                                console.log("data saved");

                                                                                window.location.href = "https://lah.web.app/forms/registration-successful.html";
                                                                            }
                                                                        });

        swal.close();
    }

    function verifyAccount()
    {

        swal("Validating email, please wait...", {
            closeOnClickOutside: false,
            closeOnEsc: false,
            buttons: false,
            icon: "info"
        });

        let confirmEmail = "";
        confirmEmail = document.getElementById("email").value;
        let dbEmail = "";
        let hackerKey = "";
        
        db.ref("hackers").once("value", (snapshot) => 
        {
            var data = snapshot.val();
            for (let i in data)
            {
                hackerKey = data[i].id;
                dbEmail = data[i].email;

                console.log(confirmEmail, "==", dbEmail);
                if (confirmEmail == dbEmail)
                {
                    console.log("emails are equal");
                    db.ref("hackers").child(hackerKey).update({verified: true}).then(()=>
                    {
                        window.location.href = 'https://lah.web.app/validation-successful.html';
                    })
                    .catch((error)=>
                    {
                        swal.close();

                        swal(error.message, {
                            closeOnClickOutside: false,
                            closeOnEsc: false,
                            button: "OK",
                            icon: "info"
                        });
                    });
                    break;
                }
                else
                {
                    swal.close();

                    swal("No hacker with this email found, please register", {
                            closeOnClickOutside: false,
                            closeOnEsc: false,
                            button: "OK",
                            icon: "info"
                    }).then((isOkay)=> 
                    {
                        if(isOkay)
                            window.location.href = 'https://lah.web.app/Registration.html';
                    });
                }
            }
        });

        swal.close();
        //document.getElementById("loader").style.display = "none";
    }

    function addEvent()
    {

    }