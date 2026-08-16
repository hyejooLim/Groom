import React, { FC, useState, MouseEvent, useEffect, useCallback, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Button, Radio, RadioGroup, FormControlLabel, Menu, MenuItem } from '@mui/material';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import ReactDatePicker from '../common/ReactDatePicker';
import * as ContentMode from '../../constants/ContentMode';
import * as PublishMode from '../../constants/PublishMode';
import { ContentModeType, PostItem } from '../../types';
import { productionURL } from '../../constants/URL';
import BottomModal from '../common/BottomModal';

interface SettingModalProps {
  mode: ContentModeType;
  createdAt: string;
  postData: PostItem;
  setPostData: React.Dispatch<React.SetStateAction<PostItem>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onPublishPost: () => void;
  isLoading: boolean;
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
  isLoading,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownItem, setDropdownItem] = useState(dropdownList[postData.allowComments ? 0 : 1]);

  const [radioValue, setRadioValue] = useState(postData.isPublic ? 'public' : 'private');
  const [publishedAt, setPublishedAt] = useState(
    mode === ContentMode.EDIT ? PublishMode.CREATEDAT : PublishMode.CURRENT,
  );

  const [reserveDate, setReserveDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    if (isLoading) {
      setIsSaving(true);
    }
  }, [isLoading]);

  useEffect(() => {
    function onClick() {
      if (showDropdown) {
        setShowDropdown(false);
      }
    }

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [showDropdown]);

  useEffect(() => {
    updateCreatedAt();
  }, [publishedAt, reserveDate]);

  const updateCreatedAt = useCallback(() => {
    if (mode === ContentMode.ADD) {
      if (publishedAt === PublishMode.RESERVE) {
        setPostData({
          ...postData,
          createdAt: reserveDate ? reserveDate.format('YYYY-MM-DD HH:mm:00') : '',
        });
      }
    } else if (mode === ContentMode.EDIT) {
      if (publishedAt === PublishMode.CURRENT) {
        setPostData({
          ...postData,
          createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
      } else if (publishedAt === PublishMode.RESERVE) {
        setPostData({
          ...postData,
          createdAt: reserveDate ? reserveDate.format('YYYY-MM-DD HH:mm:00') : '',
        });
      }
    }
  }, [reserveDate, mode, publishedAt]);

  const onChangeRadioValue = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);

    setPostData({
      ...postData,
      isPublic: e.target.value === 'public' ? true : false,
    });
  };

  const onClickLabel = (e: MouseEvent<HTMLSpanElement>) => {
    setShowDropdown(false);

    setDropdownItem({
      key: e.currentTarget.dataset.key,
      label: e.currentTarget.dataset.label,
    });
    setPostData({
      ...postData,
      allowComments: e.currentTarget.dataset.key === 'ALLOW' ? true : false,
    });
  };

  const onCloseModal = () => {
    setIsOpen(false);
    setIsSaving(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = Boolean(anchorEl);

  const handleDropdownClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <BottomModal isOpen={isOpen} onClose={onCloseModal}>
      <form onSubmit={onPublishPost} className='w-[860px] mx-auto'>
        <fieldset className='m-0 border-0 p-0'>
          <div className='border-b-2 border-black pb-3 mb-8'>
            <strong className='text-2xl'>발행</strong>
          </div>
          <div>
            <strong className='text-3xl font-normal'>{postData.title}</strong>
            <dl className='flex items-center border-b border-[#eee] h-20'>
              <dt className='w-[70px] text-xl'>기본</dt>
              <dd className='flex justify-between items-center w-full'>
                <RadioGroup value={radioValue} onChange={onChangeRadioValue} row>
                  <FormControlLabel
                    value='public'
                    control={<Radio />}
                    label={
                      <span className='relative group/public'>
                        공개
                        <div className='absolute left-[-10px] top-[30px] z-10 hidden w-[186px] h-[32px] rounded-[1px] bg-white p-[6px_11px] text-[13px] text-[#5e5e5e] shadow-[0_0_1px_0_rgba(0,0,0,0.3),0_2px_5px_0_rgba(0,0,0,0.1)] box-border group-hover/public:block after:absolute after:left-[13px] after:top-[-5px] after:h-[10px] after:w-[10px] after:rotate-45 after:border-l after:border-t after:border-[#ddd] after:bg-white'>
                          누구나 글을 읽을 수 있습니다
                        </div>
                      </span>
                    }
                  />
                  <FormControlLabel
                    value='private'
                    control={<Radio />}
                    label={
                      <span className='relative group/private'>
                        비공개
                        <div className='absolute left-[-10px] top-[30px] z-10 hidden w-[200px] h-[32px] rounded-[1px] bg-white p-[6px_11px] text-[13px] text-[#5e5e5e] shadow-[0_0_1px_0_rgba(0,0,0,0.3),0_2px_5px_0_rgba(0,0,0,0.1)] box-border group-hover/private:block after:absolute after:left-[13px] after:top-[-5px] after:h-[10px] after:w-[10px] after:rotate-45 after:border-l after:border-t after:border-[#ddd] after:bg-white'>
                          작성자만 글을 읽을 수 있습니다
                        </div>
                      </span>
                    }
                  />
                </RadioGroup>

                <div>
                  <button type='button' onClick={handleDropdownClick} className='text-grey'>
                    <span className='mr-1 text-lg'>{dropdownItem.label}</span>
                    {openDropdown ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
                  </button>
                  <Menu
                    anchorEl={anchorEl}
                    open={openDropdown}
                    onClose={handleDropdownClose}
                    className='mt-2'
                    MenuListProps={{
                      style: { padding: 0 },
                    }}
                  >
                    {dropdownList?.map((item) => (
                      <MenuItem
                        key={item.key}
                        data-key={item.key}
                        data-label={item.label}
                        onClick={(e) => {
                          onClickLabel(e);
                          handleDropdownClose();
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </dd>
            </dl>

            <dl className='flex items-center border-b border-[#eee] h-20'>
              <dt className={`w-[70px] text-xl ${radioValue === 'private' ? '!text-[#ddd]' : ''}`}>발행일</dt>
              <dd className='flex items-center w-full gap-x-4'>
                {mode === ContentMode.EDIT && (
                  <button
                    type='button'
                    disabled={isSaving || radioValue === 'private'}
                    className={`cursor-pointer ${
                      publishedAt === PublishMode.CREATEDAT ? 'text-dark' : 'text-grey'
                    } ${radioValue === 'private' ? '!text-[#ddd]' : ''}`}
                    onClick={() => setPublishedAt(PublishMode.CREATEDAT)}
                  >
                    {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
                    <span className='ml-6 mr-2 text-grey'>|</span>
                  </button>
                )}
                {radioValue === 'public' && (
                  <div className='flex items-center'>
                    <button
                      type='button'
                      className={`cursor-pointer ${publishedAt === PublishMode.CURRENT ? 'text-dark' : 'text-grey'}`}
                      disabled={isSaving}
                      onClick={() => setPublishedAt(PublishMode.CURRENT)}
                    >
                      현재
                    </button>
                    <span className='mx-6 text-grey'>|</span>
                    <button
                      type='button'
                      className={`cursor-pointer mr-4 ${publishedAt === PublishMode.RESERVE ? 'text-dark' : 'text-grey'}`}
                      disabled={isSaving}
                      onClick={() => setPublishedAt(PublishMode.RESERVE)}
                    >
                      예약
                    </button>
                    {publishedAt === PublishMode.RESERVE && (
                      <ReactDatePicker reserveDate={reserveDate} setReserveDate={setReserveDate} />
                    )}
                  </div>
                )}
              </dd>
            </dl>

            <dl className='flex items-center border-b border-[#eee] h-20'>
              <dt className='w-[70px] text-xl'>URL</dt>
              <dd>
                <span className='text-grey'>{`${productionURL}/entry/${postData.title}`}</span>
              </dd>
            </dl>
          </div>

          <div className='flex justify-center gap-x-4 pt-10'>
            <Button variant='outlined' className='!rounded-3xl !text-lg' onClick={onCloseModal}>
              취소
            </Button>
            <Button variant='contained' className='!rounded-3xl !text-lg !px-10' type='submit' disabled={isSaving}>
              {isSaving ? '저장 중' : radioValue === 'public' ? '공개 발행' : '비공개 저장'}
            </Button>
          </div>
        </fieldset>
      </form>
    </BottomModal>
  );
};

export default SettingModal;
