import { ActionIcon, Breadcrumbs as MantineBreadcrumbs, Group, Title } from '@mantine/core'
import { router } from '@inertiajs/core'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

export const Breadcrumbs = (props) => {
  return (
    <Group>
      {props.navList[0].route && (
        <ActionIcon h={48} w={48} color="gold.1" radius={32} variant="light"
                    onClick={() => router.get(route(props.navList[0].route))}>
          <IconArrowNarrowLeft />
        </ActionIcon>
      )}
      
      <MantineBreadcrumbs>
        {props.navList.map((nav, id) => (
          <Title style={{ cursor: 'pointer' }} key={id} order={id === 0 ? 1 : 4}>
            {nav.label}
          </Title>
        ))}
      
      </MantineBreadcrumbs>
    </Group>
  )
}
