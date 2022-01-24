import React, { useEffect, useState, useRef, memo, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";
import axios from "axios";
import clsx from "clsx";
import { AiFillLike } from "react-icons/ai";
import { BiLike, BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import InputEmoji from "react-input-emoji";
import { ImImages } from "react-icons/im";
import { TiDeleteOutline } from "react-icons/ti";

import imageUser from "./image/imageUser.jpg";
import postImage1 from "./image/postImage1.jpg";
import postImage2 from "./image/postImage2.jpg";
import postImage3 from "./image/postImage3.jpg";
import postImage4 from "./image/postImage4.jpg";
import { FiMoreHorizontal } from "react-icons/fi";
import styles from "./postContent.module.css";
const apiServer = "http://localhost:3000";
function PostContents({ Post, allPost }) {
  const accessToken = localStorage.getItem("accessToken");
  const { user } = useAuth0();
  const [text, setText] = useState("");
  const [saveText, setSaveText] = useState(["test"]);
  const imageRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [imgFull, setImgFull] = useState("");
  const [id, setId] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [liked, setLiked] = useState(false);


  // scroll to top when restart app
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // check is null or undefined
  const checkObjectIsUndefined = (obj) => {
    return Object.keys(obj).length > 0;
  };

  // go to post id
  const handleImageFullImage = (img, index) => {
    setImgFull(img);
  };

  const handleCountLikePost = async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    // button like
    await axios
      .post(`${apiServer}/api/like/toggle/${id}`, {}, config)

      .catch((error) => {
        console.log(error);
      });

    // get like of post
    await axios.get(`${apiServer}/api/like/${id}`).then((response) => {
      if (response.data.success) {
        setAllPosts((prev) => {
          const newPosts = [...prev];
          // index
          const index = prev.indexOf(prev.find((post) => post._id == id));
          // set lại
          newPosts[index].like[0] = response.data.likes;
          return newPosts;
        });
      }
    });
  };
  // post comment in post
  const handleOnEnter = async (id) => {
    setSaveText((prev) => [...prev, text]); // comment lại sau
    const formData = new FormData();
    formData.append("comments", saveText);
    console.log(formData);
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: formData
    };
    
    // post comment
    await axios
      .post(`${apiServer}/api/comments/${id}`, config)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    // get comments
    await axios
      .get(`${apiServer}/api/comments/${id}`)
      .then((response) => console.log(response));
  };
  useEffect(() => {
    if (allPost.length > 0) {
      setAllPosts(allPost);
    }
  }, [allPost]);
  return (
    <>
      <div className={styles.app}>
        {allPosts.length > 0 &&
          allPosts.map((post, index) => {
            return (
              <div className={styles.posts} key={index}>
                {/* user */}
                <div className={styles.user}>
                  <Link to="/user" style={{ textDecoration: "none" }}>
                    <div className={styles.userContainer}>
                      <img
                        className={styles.imageUser}
                        src={post && post.userInfo[0].avatarUrl}
                      />
                      <div>
                        <h4 style={{ color: "#3a3b3c" }}>
                          {post && post.userInfo[0].fullName}
                        </h4>
                        <h5 style={{ color: "#3a3b3c", marginTop: "5px" }}>
                          {Moment(post.createdAt).format("LTS")}
                        </h5>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <span className={styles.userMore}>
                      <FiMoreHorizontal />
                    </span>
                  </div>
                </div>
                {/* content */}
                <div className={styles.content}>
                  {/* title content */}
                  <div>
                    <h4
                      className={styles.titleContent}
                      style={{ color: "#3a3a3a" }}
                    >
                      {post.body}
                    </h4>
                  </div>

                  {/* image content */}
                  <div className={styles.imageContent}>
                    <div ref={imageRef} className={styles.container}>
                      {post.imgList.map((img, index) => {
                        return (
                          <img
                            key={index}
                            style={{
                              width: `calc(100% /${post.imgList.length}`,
                            }}
                            className={styles.postImage}
                            src={`${apiServer}/api/media/${img}`}
                            onClick={() => handleImageFullImage(img, index)}
                          />
                        );
                      })}
                    </div>
                  </div>
                  {/* video content */}
                  <div className={styles.videoContent}>
                    <div className={styles.imageContent}>
                      <div ref={imageRef} className={styles.container}>
                        {post.vidList.map((video, index) => {
                          return (
                            <video
                              key={index}
                              style={{
                                width: `calc(100% /${post.vidList.length}`,
                              }}
                              controls
                              className={styles.postVideo}
                              src={`${apiServer}/api/media/${video}`}
                              // onClick={() => handleImageFullImage(img, index)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* count like and comment */}
                  <div className={styles.likeAndComments}>
                    <div className={styles.like}>
                      <span className={styles.iconLike}>
                        <AiFillLike />
                      </span>
                      <span className={styles.countLike}>
                        {post.like[0].likeList.length > 0 &&
                          `${post.like[0].likeList[0]} và ${post.like[0].likeCount} người khác`}
                      </span>
                    </div>
                    <div className={styles.comment}>
                      <span className={styles.countComment}>50</span>
                      <span className={styles.comments}>Comment</span>
                    </div>
                  </div>
                  {/* button like and comment and share*/}
                  <div className={styles.likeAndCommentContainer}>
                    <div
                      className={
                        post &&
                        post.like[0].likeList.includes(user && user.nickname)
                          ? clsx(styles.likeContainer, styles.likes)
                          : styles.likeContainer
                      }
                      onClick={() => handleCountLikePost(post.id)}
                    >
                      <span className={styles.iconLikes}>
                        <BiLike />
                      </span>
                      <span className={styles.titleLike}>Like</span>
                    </div>
                    <div className={styles.commentContainer}>
                      <span className={styles.iconComments}>
                        <BiComment />
                      </span>
                      <span className={styles.titleComment}>Comment</span>
                    </div>
                    <div className={styles.shareContainer}>
                      <span className={styles.iconShare}>
                        <RiShareForwardLine />
                      </span>
                      <span className={styles.titleShare}>Share</span>
                    </div>
                  </div>
                </div>
                {/* input comment */}
                <div className={styles.inputCommentContainer}>
                  <img
                    src={user && user.picture}
                    className={styles.userInput}
                  />
                  <span className={styles.input}>
                    <InputEmoji
                      value={text}
                      onChange={setText}
                      cleanOnEnter
                      onEnter={ () => handleOnEnter(post.id)}
                      placeholder="Write a comment..."
                    />
                  </span>
                </div>

                {/* list comments */}
                <div className={styles.listComments}>
                  {/* render list comment */}
                  {saveText.map((text, index) => {
                    return (
                      <div key={index} className={styles.listComment}>
                        <div className={styles.item}>
                          <img
                            className={styles.userComment}
                            src={user && user.picture}
                          />
                          <div className={styles.contentComment}>
                            <h3 className={styles.nameUser}>
                              {user && user.name}
                            </h3>
                            <h4>{text}</h4>
                          </div>
                        </div>
                        <div className={styles.commentEmoji}>
                          <span className={styles.itemIcon}>
                            <BiLike />
                          </span>
                          <span className={styles.itemIcon}>
                            <BiComment />
                          </span>
                          <span className={styles.itemIcon}>2 Giờ</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        {/* loading cho nay */}
      </div>
    </>
  );
}

export default memo(PostContents);
