import Link from 'next/link'
import Image from 'next/image'
import { NavLinks } from '@/contants'
import Authproviders from './Authproviders';
import { getCurrentUser } from '@/lib/session';
async function Navbar() {
    const session = await getCurrentUser();
  return (
      <nav className='flexBetween navbar'>
          <div className='flex-1 flexStart gap-10'>
              <Link href='/'>
                  <Image alt='flexible' src="/logo.svg" width={115} height={43}/>
              </Link>
              <ul className='xl:flex hidden text-small gap-7'>
                  {NavLinks.map((link) => (
                      <Link href={link.href} key={link.key}>
                          {link.text}
                      </Link>
                  ))}
              </ul>
          </div>

          <div className="flexCenter gap-4">
              {
                  session?.user ? (
                      <>
                          {session?.user?.image && <Image
                              src={session.user.image}
                              width={40}
                              height={40}
                              alt={session.user.name}
                              className='rounded-full'
                          />
                        }
                          <Link href="/create-project"> share your work</Link>
                      </>
                  ) : (
                          <>
                              <Authproviders/>
                          </>
                  )
              }
          </div>
    </nav>
  )
}

export default Navbar