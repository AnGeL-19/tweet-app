import { Separator } from '@radix-ui/react-separator'
import React from 'react'

export const ConfigurationPage = () => {
  return (
    <div className='w-full px-4'>
        <div className='w-full flex gap-6'>
            <div className='w-full max-w-[315px] p-4 bg-white rounded shadow'>
                <h3>Configurations</h3>

                <Separator className='my-4' />

                <div>
                    <ul>
                        <li>
                            {/* HACER EL MEUN - EDIT PERFIL -NOTIFICATIONS - THEMES */}
                        </li>
                    </ul>
                </div>

            </div>

            <div className='w-full p-4 bg-white rounded shadow'>

            </div>

        </div>
    </div>
  )
}
