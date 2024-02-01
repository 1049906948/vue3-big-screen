前端div 上下左右居中

### Flexbox 布局：
```css
container  {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}
```
###  Grid 布局：
```css
container  {
  display: grid;
  place-items: center;
  height: 100vh;
}
```

###  绝对定位和 transform：
```css
.container {
  position: relative;
  height: 100vh;
}

.centered-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```



