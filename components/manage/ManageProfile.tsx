import React, { ChangeEvent, useCallback, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Button, Card } from "antd";
import { FiCamera } from "react-icons/fi";
import { BsCloudFill } from "react-icons/bs";
import { AiFillMinusSquare } from "react-icons/ai";
import classNames from "classnames";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

import { useGetUser, useUpdateUser } from "../../hooks/query/user";
import SkeletonManageProfile from "../skeleton/SkeletonManageProfile";
import * as S from "../../styles/ts/components/manage/ManageProfile";
import { s3 } from "../../lib/s3";

const ManageProfile = () => {
  const { data: user, isLoading, isError, error } = useGetUser();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (isError) {
      const err = error as any;

      alert(err?.response?.data?.message);
      signOut({ redirect: false });
    }
  }, [isError]);

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      signOut({ redirect: false });
    }
  };

  const onRemoveProfileImage = useCallback(async () => {
    if (!confirm("이미지를 삭제하시겠습니까?")) {
      return;
    }

    const key = localStorage.getItem("imageKey");
    try {
      const command = new DeleteObjectCommand({
        Bucket: "groom-project",
        Key: key,
      });

      await s3.send(command);
      localStorage.removeItem("imageKey");
      updateUser.mutate(null);
    } catch (err) {
      console.error("S3 삭제 실패", err);
    }
  }, []);

  const onChangeProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const command = new PutObjectCommand({
      Bucket: "groom-project",
      Key: e.target.files[0].name,
      Body: e.target.files[0],
    });

    localStorage.setItem("imageKey", e.target.files[0].name);

    const imageUrl = `https://${command.input.Bucket}.s3.${s3.config.region}.amazonaws.com/${command.input.Key}`;
    updateUser.mutate(imageUrl);
  };

  return (
    <S.StyledCard
      cover={
        <>
          {user?.imageUrl ? (
            <img
              className="profile"
              alt="profile"
              src={user?.imageUrl}
              width={214}
              height={200}
            />
          ) : (
            <S.EmptyProfile>
              <BsCloudFill />
            </S.EmptyProfile>
          )}
          <S.RemoveButton
            className={classNames({ show: user?.imageUrl })}
            onClick={onRemoveProfileImage}
          >
            <AiFillMinusSquare className="icon" />
          </S.RemoveButton>
          <S.CameraButton>
            <FiCamera className="icon" />
            <input
              className="edit_btn"
              type="file"
              accept="image/*"
              onChange={onChangeProfile}
            />
          </S.CameraButton>
        </>
      }
    >
      <div className="card_meta">
        {isLoading ? (
          <SkeletonManageProfile />
        ) : (
          <>
            <Card.Meta title={`${user?.name}님`} description={user?.email} />
            <Button className="logout_btn" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        )}
      </div>
    </S.StyledCard>
  );
};

export default ManageProfile;
