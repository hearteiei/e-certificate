import React from 'react'
import Sidebar from './Components/Sidebar'
import Topbar from './Components/Topbar'
import template1 from './img/template1.png'
import template2 from './img/template2.png'
import template3 from './img/template3.png'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import './All.css'
function Template() {

    return (
        <div id="wrapper">
            {/* Sidebar */}
            <Sidebar />

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Topbar */}
                    <Topbar />
                    {}
                    <div class="container-fluid">
                        <div class="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 class="h3 mb-0 text-gray-800">New Course</h1>
                        </div>

                        <div class="col-xl-25 col-md-25 mb-9">
                            <div class="card shadow custom-card-height">
                                <div class="card-body">
                                    <h5 class="card-title">กรุณาเลือกTemplate</h5>
                                    <form action="Createmany">
                                        <div className="template-selector" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Card sx={{ maxWidth: 400 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="250"
                                                        width="250"
                                                        image={template1}
                                                        alt="template1"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            Template 1
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button variant="contained" color="success">
                                                        Selected
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                            <Card sx={{ maxWidth: 400 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="250"
                                                        width="250"
                                                        image={template2}
                                                        alt="template2"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            Template 1
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button variant="contained" color="success">
                                                        Selected
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                            <Card sx={{ maxWidth: 400 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="250"
                                                        width="250"
                                                        image={template3}
                                                        alt="template3"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            Template 3
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button variant="contained" color="success">
                                                        Selected
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </div>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Template