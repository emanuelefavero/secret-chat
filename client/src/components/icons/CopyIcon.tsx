interface Props {
  strokeColor?: string
}

export default function CopyIcon({ strokeColor = '#6B7280' }: Props) {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 512 512'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M407 128H185C153.52 128 128 153.52 128 185V407C128 438.48 153.52 464 185 464H407C438.48 464 464 438.48 464 407V185C464 153.52 438.48 128 407 128Z'
        stroke={strokeColor}
        strokeWidth='32'
        strokeLinejoin='round'
      />
      <path
        d='M383.5 128L384 104C383.958 89.1609 378.044 74.9416 367.551 64.4487C357.058 53.9558 342.839 48.0422 328 48H112C95.0416 48.0501 78.792 54.8091 66.8005 66.8005C54.8091 78.792 48.0501 95.0416 48 112V328C48.0422 342.839 53.9558 357.058 64.4487 367.551C74.9416 378.044 89.1609 383.958 104 384H128'
        stroke={strokeColor}
        strokeWidth='32'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
