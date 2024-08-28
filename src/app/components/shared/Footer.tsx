import React from 'react'


interface Props {
  color?: 'text-white' | 'text-black';
}

export const Footer = ({ color = 'text-black' }: Props) => {
  return (
    <footer className={`w-full p-5 text-center text-sm ${color}`}>Created by Angel Muñoz - devChallenges.io</footer>
  )
}
