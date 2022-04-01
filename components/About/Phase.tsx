import { ReactType, ReactElement } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import OffsetBox from 'components/OffsetBorder/Box'
import Button from 'components/Button'
import CheckIcon from 'components/icons/Check'

import { Status } from './types'

export type Pool = {
  size: number
  categories: string[]
}

export type Phase = {
  index: number
  summary: ReactType | ReactElement | string
  pools: Pool[]
  status?: Status
}

export const PhaseComponent = ({
  index,
  summary,
  pools,
  status = Status.Active,
}: Phase) => {
  const isComplete = status === Status.Over
  return (
    <OffsetBox
      behind="bg-ifpink"
      className={clsx('mt-3', 'md:mr-6', 'md:w-1/2')}
    >
      <div
        className={clsx(
          'p-[3.125rem]',
          'h-[34rem]',
          'w-[20.5rem]',
          'font-favorit',
          'flex',
          'flex-col',
          'items-center',
          'm-auto'
        )}
      >
        <h4
          className={clsx(
            'text-2xl',
            'font-extended',
            'mb-2',
            'w-full',
            'text-left'
          )}
        >
          Phase {index}
        </h4>
        <p
          className={clsx(
            'my-2',
            'text-left',
            'w-full',
            'font-bold',
            'text-lg'
          )}
        >
          {pools.reduce((sum, { size }) => sum + size, 0).toLocaleString()}{' '}
          total coins
        </p>
        <p className={clsx('text-left', 'w-full')}>{summary}</p>
        <Link href={isComplete ? '#' : '/signup'} passHref>
          <Button
            border="rounded-3xl"
            colorClassName={isComplete ? 'bg-[#d7eacf]' : 'bg-iflightgray'}
            className={clsx('w-full', 'mt-4')}
          >
            {isComplete ? (
              <>
                <CheckIcon />
                <span className={clsx('text-[#389810]', 'ml-1')}>
                  Phase Complete
                </span>
              </>
            ) : (
              'Sign Up Now'
            )}
          </Button>
        </Link>
        {pools.map(({ size, categories }: Pool) => (
          <div
            key={`${size}-${categories.length}`}
            className={clsx('mt-6', 'w-full', 'text-left')}
          >
            Categories sharing {size.toLocaleString()} coins
            <ul className="pl-5">
              {categories.map((category: string) => (
                <li key={category} className={clsx('list-disc', 'pt-2')}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </OffsetBox>
  )
}

export default PhaseComponent
