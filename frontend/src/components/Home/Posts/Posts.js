import React, { useState,useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import InputEmoji from "react-input-emoji";
import { Link } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import { RiVideoFill } from "react-icons/ri";
import { IoIosVideocam } from "react-icons/io";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaTimesCircle } from "react-icons/fa";
import postImage1 from "../PostContents/image/postImage1.jpg";
import postImage2 from "../PostContents/image/postImage2.jpg";
import styles from "./post.module.css";
import clsx from "clsx";

function Posts(props) {
  const { user } = useAuth0();
  const [openFormPost, setOpenFromPost] = useState(false);
  const [valuePost, setValuePost] = useState('');

  const valueRef = useRef()

  // submit value input post
  const submitValuePost = () => {
    setOpenFromPost(false);
    setValuePost('')
    valueRef.current.focus();
  }
  return (
    <div className={styles.postContainer}>
      {/* input posts */}

      {openFormPost && (
        <div className={styles.writerContainer}>
          <div className={styles.writePost}>
            <div className={styles.titlePostContainer}>
              <h4 className={styles.titlePost}>Create Post</h4>
              <span
                className={styles.iconClosePost}
                onClick={() => setOpenFromPost(false)}
              >
                <FaTimesCircle />
              </span>
            </div>
            {/* user admin */}
            <div className={styles.contentPost}>
              <div className={styles.userPost}>
                <img className={styles.imageAdmin} src={user && user.picture} />
                <h4>{user && user.name}</h4>
              </div>
              <form>
                <InputEmoji
                  ref={valueRef}
                  value={valuePost}
                  className={styles.inputPost}
                  placeholder={`What's on your mind,${user && user.name}?`}
                  onChange={setValuePost}
                />
              </form>

              <div className={styles.imageAndVideoAndStreaming}>
                <span className={clsx(styles.iconInput, styles.image)}>
                  <BsFillImageFill />
                  <span className={clsx(styles.titleIcon, styles.iconPost)}>Image</span>
                </span>
                <span className={clsx(styles.iconInput, styles.video)}>
                  <RiVideoFill />
                  <span className={clsx(styles.titleIcon, styles.iconPost)}>Video</span>
                </span>
                <span className={clsx(styles.iconInput, styles.streaming)}>
                  <IoIosVideocam />
                  <span className={clsx(styles.titleIcon, styles.iconPost)}>Streaming</span>
                </span>
              </div>

              {/* post */}
              <div className={styles.buttonPost} onClick={submitValuePost}>
                <button className={styles.button}>Post</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {openFormPost && <div className={styles.OverLay}></div>}

      {/* user */}
      <div className={styles.userPost}>
        <img
          className={styles.coverImage}
          src="https://toigingiuvedep.vn/wp-content/uploads/2020/12/hinh-anh-phong-canh-dep-mua-dong-scaled.jpg"
        />
        <Link to="/user">
          <div className={styles.user}>
            <img className={styles.avatar} src={user && user.picture} />
            <div className={styles.nameUser}>
              <h5 className={styles.name}>{user && user.name}</h5>
              <h6 className={styles.title}>Frontend Developer</h6>
            </div>
          </div>
        </Link>
      </div>
      {/* follows */}
      <div className={styles.follows}>
        <div className={styles.followers}>
          <h3>11K</h3>
          <p>Followers</p>
        </div>
        <div className={styles.following}>
          <h3>1.4K</h3>
          <p>Following</p>
        </div>
      </div>

      {/* text */}
      <div className={styles.textareaContainer}>
        <form onClick={() => setOpenFromPost(!openFormPost)}>
        
          <InputEmoji
            className={styles.inputPost}
            placeholder={`What's on your mind,${user && user.name}?`}
           
          />
             
        </form>
        <div className={styles.imageAndVideoAndStreaming}>
          <span className={clsx(styles.iconInput, styles.image)}>
            <BsFillImageFill /> <span className={styles.titleIcon}>Image</span>
          </span>
          <span className={clsx(styles.iconInput, styles.video)}>
            <RiVideoFill />
            <span className={styles.titleIcon}>Video</span>
          </span>
          <span className={clsx(styles.iconInput, styles.streaming)}>
            <IoIosVideocam />
            <span className={styles.titleIcon}>Streaming</span>
          </span>
        </div>
      </div>

      {/* Lastest Activity */}
      <div className={styles.activityContainer}>
        <div className={styles.activityHeader}>
          <h5 className={styles.activityTitle}>Lastest Activity</h5>
          <span className={styles.activityIcon}>
            <FiMoreHorizontal />
          </span>
        </div>
        {/* activity */}

        <div className={styles.activityContent}>
          {/* render activity */}
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={styles.activity}>
              <div className={styles.activityImage}>
                <img className={styles.activityAvatar} src={postImage2} />
              </div>
              <div>
                <h4 className={styles.activityName}>
                  Phạm Văn Công đã thích bài đăng
                </h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Posts;
