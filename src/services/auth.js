import Axios from "axios";
import { toast } from "react-toastify";
import fileDownload from "js-file-download";
Axios.interceptors.response.use(null, (error) => {
  const { response } = JSON.parse(JSON.stringify(error));
  const expectedError =
    response && response.status >= 400 && response.status < 500;
  if (expectedError) {
    return Promise.reject(error);
  }
  toast.error("Unexpected Error occured");
});

export async function login(email, password) {
  const { data: jwt } = await Axios.post(
    "http://localhost:3005/resource-management/login",
    { email: email, password: password }
  );
  localStorage.setItem("token", jwt);
  return jwt;
}
export async function loginJWT(token) {
  localStorage.setItem("token", token);
}
export async function logout() {
  localStorage.removeItem("token");
}
export async function upload(formData) {
  const { data } = await Axios.post(
    "http://localhost:3005/resource-management/books",
    formData
  );
  window.location.replace("/books");
}
export async function updateBook(book) {
  const { data } = Axios.put(
    "http://localhost:3005/resource-management/books/" + `${book._id}`,
    {
      title: book.title,
      author: book.author,
      filter: book.filter,
      year: book.year,
    }
  );
}
export async function profile(password, id, token) {
  const { data } = await Axios.post(
    "http://localhost:3005/resource-management/users/me",
    { password, _id: id, token },
    {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    }
  );
}
export async function getUsers(token) {
  const { data } = await Axios.get(
    "http://localhost:3005/resource-management/users",
    {
      headers: {
        "x-token": token,
      },
    }
  );
  return data;
}
export async function deleteUser(id) {
  await Axios.delete(
    "http://localhost:3005/resource-management/users/" + `${id}`
  );
  console.log("Deleted");
}

export async function getBooks() {
  const { data: books } = await Axios.get(
    "http://localhost:3005/resource-management/books"
  );
  return books;
}
export async function deleteBook(id) {
  await Axios.delete(
    "http://localhost:3005/resource-management/books/" + `${id}`
  );
}
export async function getBook(id) {
  const book = await Axios.get(
    "http://localhost:3005/resource-management/books/" + `${id}`
  );
  return book;
}
export async function uploadVideo(video) {
  const { data: video_ } = await Axios.post(
    "http://localhost:3005/resource-management/videos/",
    {
      title: video.title,
      description: video.description,
      link: video.link,
      filter: video.filter,
      year: video.year,
    }
  );
  console.log(video_);
  return video_;
}
export async function getVideos() {
  const videos = Axios.get("http://localhost:3005/resource-management/videos/");
  return videos;
}
export async function updateVideo(video) {
  const video_ = Axios.put(
    "http://localhost:3005/resource-management/videos/" + `${video._id}`,
    {
      title: video.title,
      link: video.link,
      filter: video.filter,
      description: video.description,
      year: video.year,
    }
  );
  return video_;
}
export async function getVideo(id) {
  const video = Axios.get(
    "http://localhost:3005/resource-management/videos/" + `${id}`
  );
  return video;
}
export async function deleteVideo(id) {
  const video = Axios.delete(
    "http://localhost:3005/resource-management/videos/" + `${id}`
  );
  return video;
}
export async function downloadBook(book) {
  const file = await Axios.get(
    "http://localhost:3005/resource-management/books/download/" + `${book._id}`,
    { responseType: "blob" }
  );
  fileDownload(file.data, `${book.title}.pdf`);
}
