import React from "react"
import { NavButton } from "../nav-button"
import { BsPostcard } from "react-icons/bs"
import { FiUser } from "react-icons/fi"

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<BsPostcard />}>
            Posts
          </NavButton>

          <NavButton href="following" icon={<FiUser />}>
            Following
          </NavButton>

          <NavButton href="followers" icon={<FiUser />}>
            Followers
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
