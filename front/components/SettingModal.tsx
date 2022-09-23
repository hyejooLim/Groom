import React, { FC, useState, MouseEvent } from 'react';
import { Button, Dropdown, Form, Radio, RadioChangeEvent } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import dayjs from 'dayjs';

import ReactModal from './ReactModal';
import ReactDatePicker from './ReactDatePicker';
import * as ContentMode from '../constants/ContentMode';
import { ContentModeType } from '../types';
import * as S from '../styles/ts/components/SettingModal';

interface SettingModalProps {
  mode: ContentModeType;
  createdAt: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postTitle: string;
  onPublishPost: () => void;
}

const openMenuItem = [
  {
    key: '1',
    label: '댓글 허용',
  },
  {
    key: '-1',
    label: '댓글 비허용',
  },
];

const publishedAtList = [
  {
    key: 0,
    label: 'createdAt',
  },
  {
    key: 1,
    label: 'current',
  },
  {
    key: 2,
    label: 'reserve',
  },
];

const SettingModal: FC<SettingModalProps> = ({ mode, createdAt, isOpen, setIsOpen, postTitle, onPublishPost }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState({ key: openMenuItem[0].key, label: openMenuItem[0].label });

  const [radioValue, setRadioValue] = useState('private');
  const [publishedAt, setPublishedAt] = useState(publishedAtList[mode === ContentMode.EDIT ? 0 : 1]);

  const onChangeRadioValue = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const onClickLabel = (e: MouseEvent<HTMLSpanElement>) => {
    setOpenMenu({ key: e.currentTarget.dataset.key, label: e.currentTarget.dataset.label });
  };

  const menu = (
    <S.OverrideMenu
      items={openMenuItem.map((item) => {
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
              <strong className='post_title'>{postTitle}</strong>
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
                          setIsOpenMenu((prev) => !prev);
                        }}
                      >
                        <span className='dropdown_label'>{openMenu.label}</span>
                        {isOpenMenu ? (
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
                        on: publishedAt.key === 0,
                        disabled: radioValue === 'private',
                      })}
                      onClick={() => setPublishedAt(publishedAtList[0])}
                    >
                      {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
                    </Button>
                  )}
                  {radioValue === 'public' && (
                    <>
                      <Button
                        className={classNames('date_btn current', { on: publishedAt.key === 1 })}
                        onClick={() => setPublishedAt(publishedAtList[1])}
                      >
                        현재
                      </Button>
                      <Button
                        className={classNames('date_btn reserve', { on: publishedAt.key === 2 })}
                        onClick={() => setPublishedAt(publishedAtList[2])}
                      >
                        예약
                      </Button>
                      {publishedAt.key === 2 && <ReactDatePicker />}
                    </>
                  )}
                </dd>
              </dl>
              <dl className='editor_info url'>
                <dt>URL</dt>
                <dd>
                  <span className='post_url'>{`https://groom.vercel.app/entry/${postTitle}`}</span>
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
                {radioValue === 'public' ? '공개 발행' : '비공개 저장'}
              </Button>
            </div>
          </S.FootLayer>
        </fieldset>
      </Form>
    </ReactModal>
  );
};

export default SettingModal;
