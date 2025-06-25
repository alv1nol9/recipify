import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Made with ❤️ by Alvin
        </p>
      </div>
    </footer>
  )
}

export default Footer