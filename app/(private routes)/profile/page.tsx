import Image from "next/image"
import Link from "next/link"
import css from './ProfilePgae.module.css'
import { getServerMe  } from "@/lib/api/serverApi";
export default async function Profile(){
  const user = await getServerMe();
  console.log(user);
  
  
    return(
            <main className={css.mainContent}>
              <div className={css.profileCard}>
                  <div className={css.header}>
            	     <h1 className={css.formTitle}>Profile Page</h1>
            	     <Link href="/profile/edit" className={css.editProfileButton}>
            	       Edit Profile
            	     </Link>
            	   </div>
                 <div className={css.avatarWrapper}>
                  <Image
                    src={user?.avatar || "https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg"}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                    unoptimized
                  />
                </div>
                <div className={css.profileInfo}>
                  <p>
                  Username: {user?.username}
                  </p>
                  <p>
                    Email: {user?.email}
                  </p>
                </div>
              </div>
            </main>
        )
}