import { useEffect, useRef } from 'react';
import { IModalProps } from '../model/modal.types';
import { IoClose } from 'react-icons/io5';
import { createPortal } from 'react-dom';
import cls from './modal.module.scss';

export const Modal = (props: IModalProps) => {
  const { setVisible, visible, title, children } = props;
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setVisible]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return createPortal(
    <div className={`${cls.modal} ${visible ? cls.modal_active : ''}`}>
      <div ref={modalContentRef} className={cls.modal__content}>
        <div className={cls.modal__content__title}>
          {title}
          <button onClick={() => setVisible(false)}>
            <IoClose size='30' />
          </button>
        </div>
        <div className={cls.modal__content__text}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
