import React from 'react'

function Card() {
    return (
        <div>
          <>
          <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={bubble}/>
        <Card.Body>
          <Card.Title>Bubble Sort</Card.Title>
          <Card.Text>
             Bubble Sort Algorithm Visualization
          </Card.Text>
          <Button variant="primary"><Link className="link" to="/bubblesort">GO SOMEWHERE</Link></Button>
        </Card.Body>
      </Card>
          </>
            
        </div>
    )
}

export default Card
