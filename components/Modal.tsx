"use client"
import { useCallback, useRef, ReactNode, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';

function Modal({ children }: { children: ReactNode }) {
    const ovaley = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const onDismiss = useCallback(() => { 
        router.push('/');
    },[router]);
    
    const handleClick = useCallback((e:MouseEvent) => {
        if ((e.target === ovaley.current) && onDismiss){
            onDismiss();
        }
     },[onDismiss,ovaley]);

  return(
      <div ref={ovaley} className='modal' onClick={handleClick}>
          <button type="button" onClick={onDismiss} className='absolute top-4 right-8'>
              <Image src='/close.svg' width={17} height={17} alt='close' />
          </button>
          <div ref={wrapper} className='modal_wrapper'>
              {children}
          </div>
      </div>
  )
}

export default Modal