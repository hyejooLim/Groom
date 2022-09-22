import React, { FC, useState, MouseEvent } from 'react';
import { Button, Dropdown, Form, Radio, RadioChangeEvent } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import ReactModal from './ReactModal';
import ReactDatePicker from './ReactDatePicker';
import * as S from '../styles/ts/components/SettingModal';

interface SettingModalProps {
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

const SettingModal: FC<SettingModalProps> = ({ isOpen, setIsOpen, postTitle, onPublishPost }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState({ key: openMenuItem[0].key, label: openMenuItem[0].label });

  const [radioValue, setRadioValue] = useState('private');
  const [publishedAt, setPublishedAt] = useState('now');

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
                {radioValue === 'public' && (
                  <dd>
                    <Button
                      className={classNames('date_btn', { on: publishedAt === 'now' })}
                      onClick={() => setPublishedAt('now')}
                    >
                      현재
                    </Button>
                    <Button
                      className={classNames('date_btn', { on: publishedAt === 'reserve' })}
                      onClick={() => setPublishedAt('reserve')}
                    >
                      예약
                    </Button>
                    {publishedAt === 'reserve' && <ReactDatePicker />}
                  </dd>
                )}
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
