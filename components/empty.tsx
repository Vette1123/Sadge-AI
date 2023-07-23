import Image from 'next/image'

interface EmptyProps {
  label: string
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <div className="relative h-72 w-72">
        <Image
          src="/assets/empty.svg"
          fill
          alt="Empty"
          placeholder="blur"
          priority
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QgYDz"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
