'use client'

import React, { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

function CrispChat() {
  useEffect(() => {
    Crisp.configure(process.env.NEXT_PUBLIC_CRISP_SDK_ID as string)
  }, [])
  return null
}

export default CrispChat
