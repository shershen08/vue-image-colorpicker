export default {
  name: 'image-color-picker',
  data: function () {
    return {
      isEnabled: false,
      margin: 10,
      x: '',
      y: '',
      imageValue: '',
      getColorAverage: 25, // could be: 1, 9, 16 ...
      actualColorPointsNumber: 0,
      curentColor: ''
    }
  },
  props: {
    showcolor: {
      type: Boolean,
      default: true
    },
    selectimage: {
      type: Boolean,
      default: true
    },
    toggleselect: {
      type: Boolean,
      default: false
    },
    imagesrc: {
      type: String
    }
  },
  methods: {
    toggleState: function () {
      this.isEnabled = !this.isEnabled
    },
    init: function () {
      this.encodeImageFileAsURL('imagePlaceHolder')
    },
    useCanvas: function (image, callback) {
      this.$refs.c.width = this.$refs.prevewImage.width
      this.$refs.c.height = this.$refs.prevewImage.height
      // draw image in canvas tag
      this.$refs.c.getContext('2d')
        .drawImage(this.$refs.prevewImage, 0, 0, this.$refs.prevewImage.width, this.$refs.prevewImage.height)
      return callback()
    },
    onMouseMove: function (e) {
      var x, y
      if (!this.isEnabled) return

      if (e.offsetX) {
        x = e.offsetX
        y = e.offsetY
      } else if (e.layerX) {
        x = e.layerX
        y = e.layerY
      }
      var that = this
      this.useCanvas(this.$refs.prevewImage, function () {
        // get image data
        var p = that.$refs.c.getContext('2d').getImageData(x, y, 1, 1).data
        that.$refs.preview.style.background = that.rgbToHex(p[ 0 ], p[ 1 ], p[ 2 ])
        that.$refs.preview.style.top = y + that.margin + 'px'
        that.$refs.preview.style.left = x + that.margin + 'px'
      })
    },
    onSelectColor: function (e) {
      var x, y
      if (!this.isEnabled) return

      e.preventDefault()

      if (e.offsetX) {
        x = e.offsetX
        y = e.offsetY
      } else if (e.layerX) {
        x = e.layerX
        y = e.layerY
      }
      var that = this
      this.useCanvas(this.$refs.prevewImage, function () {
        // get image data
        var pOne = that.$refs.c.getContext('2d').getImageData(x, y, 1, 1).data
        var p = that.averageColor(that.getNeighbouringColorValues(x, y))
        console.log('%c One point ', 'background: ' + that.rgbToHex(pOne[ 0 ], pOne[ 1 ], pOne[ 2 ]) + '; color: #fff')
        console.log('%c Average 9 ', 'background: ' + that.rgbToHex(p[ 0 ], p[ 1 ], p[ 2 ]) + '; color: #fff')
        that.drawColorText(p)
        that.setBackgroundColor(p)
      })
    },
    getNeighbouringColorValues: function (x, y) {
      var cc = this.$refs.c.getContext('2d')
      var res = []
      this.actualColorPointsNumber = this.getColorAverage
      var matrixMargin = (Math.sqrt(this.getColorAverage) - 1) / 2
      var resFlat = cc.getImageData(x - matrixMargin, y - matrixMargin, 1 + 2 * matrixMargin, 1 + 2 * matrixMargin).data
      for (var i = 0; i < resFlat.length - 3; i = i + 4) {
        if (resFlat[i] === resFlat[i + 1] === resFlat[i + 2] === resFlat[i] === 0) { // all black
          this.actualColorPointsNumber--
        } else {
          res.push([resFlat[i], resFlat[i + 1], resFlat[i + 2], resFlat[i + 3]])
        }
      }
      return res
    },
    getIntDividedByNumberOfDots: function (value) {
      return parseInt(value / this.actualColorPointsNumber)
    },
    averageColor: function (colorsArray) {
      var averageColor = [0, 0, 0]
      for (var i = 0; i < this.getColorAverage; i++) {
        averageColor[0] += +colorsArray[i][0]
        averageColor[1] += +colorsArray[i][1]
        averageColor[2] += +colorsArray[i][2]
      }
      return [this.getIntDividedByNumberOfDots(averageColor[0]),
        this.getIntDividedByNumberOfDots(averageColor[1]),
        this.getIntDividedByNumberOfDots(averageColor[2]),
        255]
    },
    setBackgroundColor: function (p) {
      this.$refs.result.style.background = this.rgbToHex(p[ 0 ], p[ 1 ], p[ 2 ])
    },
    drawColorText: function (p) {
      this.$refs.result.innerHTML = '<span>HEX: ' + this.rgbToHex(p[ 0 ], p[ 1 ], p[ 2 ]) + '</span>' +
          '<span>RGB:  rgb(' + p[ 0 ] + ',' + p[ 1 ] + ',' + p[ 2 ] + ')</span>'
    },
    encodeImageFileAsURL: function (container) {
      var filesSelected = this.$refs.inputfile.files
      var that = this
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[ 0 ]
        var fileReader = new FileReader()
        fileReader.onload = function (fileLoadedEvent) {
          var srcData = fileLoadedEvent.target.result // <--- data: base64
          var newImage = document.createElement('img')
          newImage.src = srcData
          that.$refs.prevewImage.src = srcData
        }
        fileReader.readAsDataURL(fileToLoad)
      }
    },
    rgbToHex: function (r, g, b) {
      return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)
    },
    componentToHex (c) {
      var hex = c.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    },
    handleMouseDown (e) {
      this.onSelectColor(e)
      window.addEventListener('mousemove', this.onSelectColor)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp (e) {
      this.unbindEventListeners()
    },
    unbindEventListeners () {
      window.removeEventListener('mousemove', this.onSelectColor)
      window.removeEventListener('mouseup', this.handleMouseUp)
    }
  },
  mounted: function () {
    if (this.imagesrc) {
      this.$refs.prevewImage.src = this.imagesrc
    }
    if (!this.toggleselect) {
      this.isEnabled = true
    }
  }
}
