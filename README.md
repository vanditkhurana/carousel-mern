# Carousel

Carousel App with the functionality to add image, manually move to next or previous image, delete image, update time interval of carousel and update the order of images in carousel.
## Installation

Clone the repo and install the dependencies.

```bash
git clone https://github.com/vanditkhurana/csv-generator.git
```

```bash
npm install
```

## Start
Start both client and server by running the following in each after navigating to client and server folder
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

## UI

UI will have all the functionalities as per the requirement and the carousel which will update with the updation in each functionality.
Tech Used - React

![image](https://github.com/vanditkhurana/carousel-mern/assets/52314194/730ccacc-7110-4e5b-acb1-ceb764b7a20f)


## Backend APIs

### 1. To add image data object in DB
#### Request

`GET /api/images`

#### Response

  ```bash
  Sends all images objects in array from DB
  ```

### 2. To create new image object in DB
#### Request

`POST /api/images`

Request Body : 
```bash
  {
    title : <Title of image>,
    description : <Description of image>,
    imagePath : <Url path for image>,
    order : <Rank of image> (Will help out in ordering the images as per the requirements by user)
  }
```

#### Response

  ```bash
  Sends the new generated image object as response
  ```

### 3. To update image object in DB (Will be used to update order of images)
#### Request

`PUT /api/images/:id`

Request Body : 
```bash
  {
    title : <New title of image>,
    description : <Description of image>,
    order : <New rank of image> (Will help out in ordering the images as per the requirements by user)
  }
```

#### Response

  ```bash
  Sends the new order of images object as response
  ```

### 4. To delete the image object
#### Request

`DELETE /api/images/:id`

#### Response

  ```bash
  Sends the "Image deleted successfully" as response for the particular image object deleted in db
  ```
