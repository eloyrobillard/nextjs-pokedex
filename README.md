# Outline

Example pokédex app using Next.js.

## Data & Assets

All the pokemon data comes from PokéAPI, then stored in a Supabase DB (currently disabled)。

## Home page

![](https://storage.googleapis.com/zenn-user-upload/2c53ad6d2e74-20240112.png)

## Pokemon card detail

<img src="https://storage.googleapis.com/zenn-user-upload/b853ad6beeee-20240112.png" alt="Sceptile's card" height="250px" />

## Details page

Opens when clicking a pokemon card in the home page:

![Bulbasaur's details page, with a flashy design](https://storage.googleapis.com/zenn-user-upload/80b29aa215a6-20240112.png)

### Stat gauges

The gauges use an animation to make the gauge seem like it's scrolling to the right (not well represented by this static image):

![stat gauges](https://storage.googleapis.com/zenn-user-upload/98d1375080b6-20240109.png)

### Gauge animation specifics

First set a gradient in the background using two colors to create a stripe pattern：

``` css
background: repeating-linear-gradient(45deg, #A1CD9B, #A1CD9B 5px, #91C58A 5px, #91C58A 10px);
```

[Translation](https://developer.mozilla.org/ja/docs/Web/CSS/gradient/repeating-linear-gradient#zebra_stripes)：
- `45deg`: looking up and to the left
- `#A1CD9B, #A1CD9B 5px`: use the color '#A1CD9B'色 up to 5px from the origin
- `#91C58A 5px, #91C58A 10px`: use the color '#91C58A' from 5px to 10px from the origin

And here is the actual animation：

``` css
animation: 1s linear infinite stat-gauge-strips;
```

``` css
@keyframes stat-gauge-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}
```

Now the background is set to move `1rem`, so we must also set the width and height of the stripe pattern to `1rem` otherwise the animation will stutter：

``` css
background-size: 1rem 1rem;
```
