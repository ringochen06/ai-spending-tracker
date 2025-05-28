import { Button } from '@mui/material'

interface AboutPageProps {
  textContent: string;
}

function AboutPage({ textContent }: AboutPageProps) {
  return (
    <div>
      <h2>About</h2>
      <p>{textContent}</p>
      <Button variant="contained">Contained</Button>
    </div>
  )
}
export default AboutPage;