import { Breadcrumbs as MantineBreadcrumbs, Title } from '@mantine/core'
import { router } from '@inertiajs/core'


export const Breadcrumbs = (props) => {
  return (
    <MantineBreadcrumbs>
      {props.navList.map((nav, id) => (
        <Title
          key={id}
          order={id === 0 ? 1 : 4}
          onClick={() => router.get(route(nav.route))}
        >
          {nav.label}
        </Title>
      ))}
    </MantineBreadcrumbs>
  )
}
