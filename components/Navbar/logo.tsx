import Image from 'next/image'

export default function logo() {
  return (
    <div>
      <Image 
        src= '/logo.png'
        alt= 'logo'
        width= {200}
        height= {200} />
    </div>
  )
}
