import React, { FC, useState, MouseEvent, useEffect, useCallback } from 'react';
import { Button, Dropdown, Form, Radio, RadioChangeEvent } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import dayjs from 'dayjs';

import ReactModal from './ReactModal';
import ReactDatePicker from './ReactDatePicker';
import * as ContentMode from '../constants/ContentMode';
import * as PublishMode from '../constants/PublishMode';
import { ContentModeType, PostItem, ReserveDate } from '../types';
import * as S from '../styles/ts/components/SettingModal';

interface SettingModalProps {
  mode: ContentModeType;
  createdAt: string;
  postData: PostItem;
  setPostData: React.Dispatch<React.SetStateAction<PostItem>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onPublishPost: () => void;
}

const dropdownList = [
  {
    key: 'ALLOW',
    label: '댓글 허용',
  },
  {
    key: 'NO_ALLOW',
    label: '댓글 비허용',
  },
];

const SettingModal: FC<SettingModalProps> = ({
  mode,
  createdAt,
  postData,
  setPostData,
  isOpen,
  setIsOpen,
  onPublishPost,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItem, setDropdownItem] = useState(dropdownList[postData.allowComments ? 0 : 1]);

  const [radioValue, setRadioValue] = useState(postData.isPublic ? 'public' : 'private');
  const [publishedAt, setPublishedAt] = useState(
    mode === ContentMode.EDIT ? PublishMode.CREATEDAT : PublishMode.CURRENT
  );
  const [reserveDate, setReserveDate] = useState<ReserveDate>({
    date: dayjs().format('YYYY-MM-DD'),
    hour: String(dayjs().hour()).length === 1 ? '0' + String(dayjs().hour()) : String(dayjs().hour()),
    minute: String(dayjs().minute()).length === 1 ? '0' + String(dayjs().minute()) : String(dayjs().minute()),
  });

  useEffect(() => {
    updateCreatedAt();
  }, [publishedAt, reserveDate]);

  const updateCreatedAt = useCallback(() => {
    const { date, hour, minute } = reserveDate;

    if (mode === ContentMode.ADD) {
      if (publishedAt === PublishMode.RESERVE) {
        setPostData({ ...postData, createdAt: date + ' ' + hour + ':' + minute + ':' + '00' });
      }
    } else if (mode === ContentMode.EDIT) {
      if (publishedAt === PublishMode.CURRENT) {
        setPostData({ ...postData, createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss') });
      } else if (publishedAt === PublishMode.RESERVE) {
        setPostData({ ...postData, createdAt: date + ' ' + hour + ':' + minute + ':' + '00' });
      }
    }
  }, [reserveDate, mode, publishedAt]);

  const onChangeRadioValue = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);

    setPostData({ ...postData, isPublic: e.target.value === 'public' ? true : false });
  };

  const onClickLabel = (e: MouseEvent<HTMLSpanElement>) => {
    setDropdownItem({ key: e.currentTarget.dataset.key, label: e.currentTarget.dataset.label });

    setPostData({ ...postData, allowComments: e.currentTarget.dataset.key === 'ALLOW' ? true : false });
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const menu = (
    <S.OverrideMenu
      items={dropdownList.map((item) => {
        return {
          key: item.key,
          label: (
            <span data-key={item.key} data-label={item.label} onClick={onClickLabel}>
              {item.label}
            </span>
          ),
        };
      })}
    />
  );

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onCloseModal}>
      <Form onFinish={onPublishPost}>
        <fieldset>
          <S.HeadLayer>
            <strong className='head_layer_title'>발행</strong>
          </S.HeadLayer>

          <S.BodyLayer>
            <div className='publish_editor'>
              <strong className='post_title'>{postData.title}</strong>
              <dl className='editor_info default'>
                <dt>기본</dt>
                <dd>
                  <Radio.Group value={radioValue} onChange={onChangeRadioValue}>
                    <Radio className='radio_public' value='public'>
                      공개
                      <S.PublicInfoBox>누구나 글을 읽을 수 있습니다</S.PublicInfoBox>
                    </Radio>
                    <Radio className='radio_private' value='private'>
                      비공개
                      <S.PrivateInfoBox>작성자만 글을 읽을 수 있습니다</S.PrivateInfoBox>
                    </Radio>
                  </Radio.Group>

                  <S.DropdownWrapper>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowDropdown((prev) => !prev);
                        }}
                      >
                        <span className='dropdown_label'>{dropdownItem.label}</span>
                        {showDropdown ? (
                          <UpOutlined className='dropdown_icon' />
                        ) : (
                          <DownOutlined className='dropdown_icon' />
                        )}
                      </button>
                    </Dropdown>
                  </S.DropdownWrapper>
                </dd>
              </dl>
              <dl className='editor_info publishedAt'>
                <dt className={classNames({ disabled: radioValue === 'private' })}>발행일</dt>
                <dd>
                  {mode === ContentMode.EDIT && (
                    <Button
                      className={classNames('date_btn createdAt', {
                        on: publishedAt === PublishMode.CREATEDAT,
                        disabled: radioValue === 'private',
                      })}
                      onClick={() => setPublishedAt(PublishMode.CREATEDAT)}
                    >
                      {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
                    </Button>
                  )}
                  {radioValue === 'public' && (
                    <>
                      <Button
                        className={classNames('date_btn current', { on: publishedAt === PublishMode.CURRENT })}
                        onClick={() => setPublishedAt(PublishMode.CURRENT)}
                      >
                        현재
                      </Button>
                      <Button
                        className={classNames('date_btn reserve', { on: publishedAt === PublishMode.RESERVE })}
                        onClick={() => setPublishedAt(PublishMode.RESERVE)}
                      >
                        예약
                      </Button>
                      {publishedAt === PublishMode.RESERVE && (
                        <ReactDatePicker reserveDate={reserveDate} setReserveDate={setReserveDate} />
                      )}
                    </>
                  )}
                </dd>
              </dl>
              <dl className='editor_info url'>
                <dt>URL</dt>
                <dd>
                  <span className='post_url'>{`https://groom.vercel.app/entry/${postData.title}`}</span>
                </dd>
              </dl>
            </div>
          </S.BodyLayer>

          <S.FootLayer>
            <div className='btn_wrapper'>
              <Button className='cancel btn' onClick={onCloseModal}>
                취소
              </Button>
              <Button htmlType='submit' className='submit btn'>
                {radioValue ? '공개 발행' : '비공개 저장'}
              </Button>
            </div>
          </S.FootLayer>
        </fieldset>
      </Form>
    </ReactModal>
  );
};

export default SettingModal;
