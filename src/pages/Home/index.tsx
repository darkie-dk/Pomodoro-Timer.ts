import { Pause, Play } from 'phosphor-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContexts'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa.'),
  minutesAmount: z.number().min(1).max(95),
})

type newCycleFormData = z.infer<typeof newCycleFormSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const submitIsDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <Pause size={24} />
            Suspend timer
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={submitIsDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
