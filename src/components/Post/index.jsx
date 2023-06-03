/* eslint-disable no-alert */
import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import EditableText from '../EditableText';
import { PostActionsStyled, PostStyled } from './styled';
import { UserAvatarStyled } from '../../styled';
import highlightHashtags from './utils';
import LinkPreview from '../LinkPreview';
import ModalCustom from '../ModalCustom';
import { useMutation } from '../../hooks/request.hooks';
import { deletePost, editPost } from '../../services/api/posts.services';
import Likes from '../Likes';

export default function Post({
  postId,
  userName,
  userImageUrl,
  userId,
  url,
  refreshPosts,
  description: rawDescription,
}) {
  const [isModalOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    mutate: deleteUserPost,
    loading: loadingDelete,
  } = useMutation(deletePost);

  const {
    mutate: editUserPost,
    loading: loadingEdit,
  } = useMutation(editPost);

  const loggedUserId = 3;
  const isPostOwner = loggedUserId === userId;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const closeEdition = () => setIsEditing(false);
  const toggleEdition = () => setIsEditing(!isEditing);

  const handleDelete = () => {
    deleteUserPost({
      postId,
      onSuccess: () => {
        closeModal();
        refreshPosts();
      },
      onError: () => {
        closeModal();
        alert('Unable to delete post');
      },
    });
  };

  const handleEdit = (event) => {
    const editedText = event.target.value?.trim();
    if (editedText === rawDescription) {
      closeEdition();
      return;
    }
    editUserPost({
      postId,
      url,
      description: editedText,
      onSuccess: () => {
        closeEdition();
        refreshPosts();
      },
      onError: () => {
        alert('Unable to edit post');
      },
    });
  };

  const postDescription = highlightHashtags(rawDescription);

  return (
    <>
      <ModalCustom
        title="Are you sure you want to delete this post?"
        confirmText="Yes, delete it"
        cancelText="No, go back"
        onConfirm={handleDelete}
        onCancel={closeModal}
        isOpen={isModalOpen}
        isLoading={loadingDelete}
      />
      <PostStyled>
        <PostActions
          isPostOwner={isPostOwner}
          onClickDelete={openModal}
          onClickEdit={toggleEdition}
        />
        <div>
          <UserAvatarStyled src={userImageUrl} alt="avatar" />
          <Likes postId={postId} />
        </div>
        <div>
          <p>{userName}</p>
          <EditableText
            text={postDescription}
            defaultInputValue={rawDescription}
            isEditing={isEditing}
            onEscape={closeEdition}
            onEnter={handleEdit}
            disabled={loadingEdit}
          />
          <LinkPreview url={url} />
        </div>
      </PostStyled>
    </>
  );
}

export function PostActions({ isPostOwner, onClickDelete, onClickEdit }) {
  if (!isPostOwner) return '';
  return (
    isPostOwner && (
      <PostActionsStyled>
        <MdEdit onClick={onClickEdit} />
        <AiFillDelete onClick={onClickDelete} />
      </PostActionsStyled>
    )
  );
}
