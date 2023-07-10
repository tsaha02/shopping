import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { Button, Form } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUser(currentUser);

      retrieveProfilePictureURL(currentUser.uid);
    }
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleProfilePictureRemove = () => {
    setProfilePicture(null);
    setProfilePictureURL(null);
  };

  const uploadProfilePicture = () => {
    if (profilePicture) {
      const storageRef = firebase.storage().ref(`profilePictures/${user.uid}`);
      const uploadTask = storageRef.put(profilePicture);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error uploading profile picture:", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setProfilePictureURL(downloadURL);
            console.log("Profile picture download URL:", downloadURL);
          });
        }
      );
    }
  };

  const retrieveProfilePictureURL = (userId) => {
    const storageRef = firebase.storage().ref(`profilePictures/${userId}`);
    storageRef.getDownloadURL().then((downloadURL) => {
      setProfilePictureURL(downloadURL);
    });
  };

  return (
    <div className="profile-page" style={styles.container}>
      <h2 style={styles.heading}>Welcome To Your Profile</h2>
      {user && (
        <div style={styles.content}>
          <p style={styles.text}>Welcome {user.email}</p>
          <Form.Group controlId="profilePicture">
            <Form.Label>Profile Picture</Form.Label>
            {profilePictureURL ? (
              <div style={styles.profilePictureContainer}>
                <img
                  src={profilePictureURL}
                  alt="Profile"
                  style={styles.profilePicture}
                />
                <Button
                  variant="danger"
                  onClick={handleProfilePictureRemove}
                  style={styles.removePictureButton}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
              />
            )}
          </Form.Group>
          <Button variant="primary" onClick={uploadProfilePicture}>
            Upload Profile Picture
          </Button>
          <br />
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
          <p style={styles.text}>
            You can start shopping by clicking <Link to="/home">here</Link>.
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f8f8",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  text: {
    marginBottom: "10px",
    color: "#555",
  },
  profilePictureContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  profilePicture: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginRight: "10px",
    borderRadius: "50%",
  },
  removePictureButton: {
    marginLeft: "10px",
  },
  button: {
    marginBottom: "10px",
    borderRadius: "4px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Profile;
