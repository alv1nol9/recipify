import React from 'react'
import Icon from '@mdi/react';
import { mdiGmail } from '@mdi/js';
import { mdiPhone } from '@mdi/js';
import { mdiTwitter } from '@mdi/js';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 mt-8 ">
      <h1><strong>Contacts us</strong></h1>
      <div className='flex justify-start'>
        <div>
      <Icon className='flex justify-center'path={mdiGmail} size={1} />email: recipe@gmail.com
      <Icon path={mdiPhone} size={1} />call us:  +254 123 456 789
      <Icon path={mdiTwitter} size={1} />follow us on twitter: #recipies
         </div>
      </div>
      <div className="container mx-auto text-center">

        <p className="text-sm">

          &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Made with ❤️ by Alvin and Habert

        </p>
      </div>
    </footer>
  )
}

export default Footer