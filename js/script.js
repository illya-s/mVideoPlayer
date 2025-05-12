$(document).ready(function () {
	class MVideo {
		constructor() {
			this._videoWrapper = $('#mVideoWrapper');
			this._video = $("#m-video").get(0);

			this._videoSelectorWrapper = $('.m-video-selector-episode-list');
			this._episodeSelector = function() {
				return $('.m-video-selector-episode')
			};

			this._positionCont = $('.video-position-cont')

			this._togglePlayBtn = $('#mVideoTogglePlayBtn, #mVideoBigPlayBtn, #mVideoTogglePlayArea');
			this._togglePlayArea = $('#mVideoTogglePlayArea')

			this._volumeCont = $('.video-volume-cont')

			this._toggleFullscreenBtn = $('#mVideoToggleFullscreenBtn');

			this._togglePlayBtn.on('click', () => this.togglePlay());
			this._toggleFullscreenBtn.on('click', () => this.toggleFullscreen());


			this.slideIndex = 0;
			this._videoSelectorWrapper.slick({
				infinite: false,

				arrows: true,
				prevArrow: `<div class="prevArrow"><svg width="21" height="34" viewBox="0 0 21 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 31L4 17L18 3" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg></div>`,
				nextArrow: `<div class="nextArrow"><svg width="21" height="34" viewBox="0 0 21 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L17 17L3 31" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg></div>`,

				slidesToShow: 8,
				slidesToScroll: 8
			});


			this._episodeLastSelector = null;
			var isDragging = false;
			$('.m-video-selector-episode-list').on('mousedown touchstart', function () {
				isDragging = false;
			});

			$('.m-video-selector-episode-list').on('mousemove touchmove', function () {
				isDragging = true;
			});

			$(document).on('click', '.m-video-selector-episode', (e) => {
				if (isDragging) return;

				if (!$(e.target).closest(this._episodeLastSelector).length) {
					if (this._episodeLastSelector) {
						this._episodeSelector().removeClass('active')
					}

					$(e.target).addClass('active')
					this._episodeLastSelector = $(e.target);

					this.setSrc($(e.target).data('url'))
				}
			});

			class Progress {
				constructor(parent) {
					this.parent = parent;

					this._current_time = $('#mVideoCurrentTime');
					this._duration = $("#mVideoDuration");

					this._progressBtn = $('#mVideoProgress');
					this._hover_time = $('#mVideoHoverTime');
					this._hover_progress = $('#mVideoHoverProgress');
					this._progressBar = $('#mVideoProgressBar');

					this._rewind_area = $('.video-rewind-area');

					this._rewindLeftArea = $('#mVideoRewindLeftArea');
					this._rewindLeftArrows = this._rewindLeftArea.children();

					this._rewindRightArea = $('#mVideoRewindRightArea');
					this._rewindRightArrows = this._rewindRightArea.children();

					this._loader = $('#mVideoLoader');

					$(this.parent._video).on('loadedmetadata', () => {
						this.onLoadMetaData()
					});

					$(this.parent._video).on('waiting', () => {
						this._loader.show();
					});
					$(this.parent._video).on('playing canplay', () => {
						this._loader.hide();
					});

					this._progressBtn.on('mousedown', (e) => {
						const progressWidth = this._progressBtn.width();
		
						const updateProgress = (eMove) => {
							const rect = this._progressBtn[0].getBoundingClientRect();
							let offsetX = eMove.clientX - rect.left;
					
							offsetX = Math.max(0, Math.min(offsetX, progressWidth));
					
							const pos = (offsetX * 100) / progressWidth;

							this.progress(pos)
						};

						updateProgress(e);
		
						$(document).on('mousemove.volumeControl', updateProgress);
						$(document).on('mouseup.volumeControl', () => {
							$(document).off('.volumeControl');
						});
					})
					this._progressBtn.on('touchstart', (e) => {
						const touch = e.originalEvent.touches[0];
						const progressWidth = this._progressBtn.width();
					
						const updateProgress = (touchMoveEvent) => {
							const rect = this._progressBtn[0].getBoundingClientRect();
							const moveTouch = touchMoveEvent.touches[0];
							let offsetX = moveTouch.clientX - rect.left;
					
							offsetX = Math.max(0, Math.min(offsetX, progressWidth));
							const pos = (offsetX * 100) / progressWidth;
							this.progress(pos);
						};
					
						$(document).on('touchmove.progressTouch', updateProgress);
						$(document).on('touchend.progressTouch', () => {
							$(document).off('.progressTouch');
						});
					
						updateProgress({ touches: [touch] });
						e.preventDefault();
					});

					this._progressBtn.on('mousemove', (e) => {
						const offset = this._progressBtn.offset();
						const relativeX = e.pageX - offset.left;
						const progressWidth = this._progressBtn.width();
						const duration = this.parent._video.duration;
		
						const hoverTime = (relativeX / progressWidth) * duration;
		
						this._hover_progress.width(relativeX)
						this._hover_time.text(this.formatTime(hoverTime));
						this._hover_time.css({
							left: relativeX + 'px',
							display: 'block'
						});
					});
					this._progressBtn.on('mouseleave', () => {
						this._hover_time.hide();
						this._hover_progress.width(0)
					});

					this._rewind_area.on('dblclick', (e) => {
						this.rewindVideo(parseInt($(e.target).data('val')))
					})

					let lastTap = 0;
					this._rewind_area.on('touchend', (e) => {
						const now = Date.now();
						const delta = now - lastTap;
						lastTap = now;

						if (delta < 300) {
							const val = parseInt($(e.target).data('val')) || 10;
							this.rewindVideo(val);
						}
					});

					$(this.parent._video).on('timeupdate', () => {
						this.onTimeUpdate()
					})

					$(window).on('resize', () => {
						this.onTimeUpdate();
					});
				}

				onTimeUpdate() {
					var currentTime = this.parent._video.currentTime;
					var fCurrentTime = this.formatTime(currentTime);
					this._current_time.text(fCurrentTime);
	
					var duration = this.parent._video.duration;
					var fDuration = this.formatTime(duration);
					this._duration.text(fDuration);
	
					const progressWidth = this._progressBtn.width();
					const progress = (currentTime * 100) / duration;
					const pos = (progress * progressWidth) / 100;
	
					this._progressBar.width(pos);
				}

				rewindVideo(addTime) {
					const ct = this.parent._video.currentTime
					this.parent._video.currentTime = ct + addTime

					if (addTime < 0) {
						this._playLeftRewindAnim();
					} else {
						this._playRightRewindAnim();
					}
				}
				_playLeftRewindAnim() {
					const elements = this._rewindLeftArrows.children()
					const list = elements.get().reverse();

					elements.stop(true, true).css('opacity', .2);
					this._rewindLeftArrows.stop(true, true).css('opacity', 1);

					$(list).each(function (index, element) {
						$(element)
							.delay(index * 150)
							.animate({'opacity': 1}, 200);
					});

					this._rewindLeftArrows
						.delay(elements.length * 200)
						.animate({opacity: 0}, 300);
				}
				_playRightRewindAnim() {
					const elements = this._rewindRightArrows.children()

					elements.stop(true, true).css('opacity', .2)
					this._rewindRightArrows.stop(true, true).css('opacity', 1)

					$(elements).each(function (index, element) {
						$(element)
							.delay(index * 150)
							.animate({'opacity': 1}, 200);
					});

					this._rewindRightArrows
						.delay(elements.length * 200)
						.animate({opacity: 0}, 300);
				}

				formatTime(seconds) {
					const hrs = Math.floor(seconds / 3600);
					const min = Math.floor((seconds % 3600) / 60);
					const sec = Math.floor(seconds % 60);
				  
					if (hrs > 0) {
						return `${hrs}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
					} else {
						return `${min}:${sec.toString().padStart(2, '0')}`;
					}
				}

				setStorageProgress(videoUrl, newValue) {
					newValue = typeof newValue === "string" ? parseFloat(newValue) : newValue;
					let progressMap = JSON.parse(localStorage.getItem('mVideoProgress')) || {};

					progressMap[videoUrl] = newValue;

					localStorage.setItem('mVideoProgress', JSON.stringify(progressMap));
				}
				getStorageProgress(videoUrl) {
					let progressMap = JSON.parse(localStorage.getItem('mVideoProgress')) || {};
					return progressMap[videoUrl] || 0;
				}

				progress(newValue) {
					if (newValue === undefined) {
						return this.parent._video.currentTime;
					} else {
						var newValue = typeof(newValue) == "string" ? parseFloat(newValue) : newValue
						this.setStorageProgress(this.parent.getSrc(), newValue)

						const duration = this.parent._video.duration;
						const newTime = (duration * newValue) / 100;

						const progressWidth = this._progressBtn.width();
						const pos = (newValue * progressWidth) / 100;

						this._progressBar.width(pos);
						this.parent._video.currentTime = newTime;
					}
				}


				onLoadMetaData() {
					const savedTime = this.getStorageProgress(this.parent.getSrc());
					const time = parseFloat(savedTime || 0);
					if (savedTime) {
						this.progress(time);
					}
					this.onTimeUpdate();
				}
			}

			class Volume {
				constructor(parent) {
					this.parent = parent;

					this._volumeBtn = $('#mVideoVolume');
					this._volumeBar = $('#mVideoVolumeBar');
					this._toggleVolumeBtn = $('#mVideoToggleVolumeBtn');
					this._oldVolume = localStorage.getItem('mVideoVolume')

					this._toggleVolumeBtn.on('click', () => this.toggleVolume());

					if (!localStorage.getItem('mVideoVolume')) {
						localStorage.setItem('mVideoVolume', 100);
					} else {
						this.volume(localStorage.getItem('mVideoVolume'))
					}

					this._volumeBtn.on('mousedown', (e) => {
						const volumeWidth = this._volumeBtn.width();
		
						const updateVolume = (eMove) => {
							const rect = this._volumeBtn[0].getBoundingClientRect();
							let offsetX = eMove.clientX - rect.left;
					
							offsetX = Math.max(0, Math.min(offsetX, volumeWidth));
					
							const pos = (offsetX * 100) / volumeWidth;
		
							if (pos === 0) {
								this._toggleVolumeBtn.addClass('active');
							} else {
								this._toggleVolumeBtn.removeClass('active');
							}

							this.volume(pos)
						};

						updateVolume(e);
		
						$(document).on('mousemove.volumeControl', updateVolume);
						$(document).on('mouseup.volumeControl', () => {
							$(document).off('.volumeControl');
						});
					})
					this._volumeBtn.on('touchstart', (e) => {
						const touch = e.originalEvent.touches[0];
						const volumeWidth = this._volumeBtn.width();
					
						const updateVolume = (touchMoveEvent) => {
							const rect = this._volumeBtn[0].getBoundingClientRect();
							const moveTouch = touchMoveEvent.touches[0];
							let offsetX = moveTouch.clientX - rect.left;
					
							offsetX = Math.max(0, Math.min(offsetX, volumeWidth));
							const pos = (offsetX * 100) / volumeWidth;
					
							if (pos === 0) {
								this._toggleVolumeBtn.addClass('active');
							} else {
								this._toggleVolumeBtn.removeClass('active');
							}
					
							this.volume(pos);
						};
					
						$(document).on('touchmove.volumeTouch', updateVolume);
						$(document).on('touchend.volumeTouch', () => {
							$(document).off('.volumeTouch');
						});
					
						updateVolume({ touches: [touch] });
						e.preventDefault();
					});
				}

				volume(newValue) {
					if (newValue === undefined) {
						return this.parent._video.volume * 100;
					} else {
						newValue = typeof(newValue) == "string" ? parseInt(newValue) : newValue

						const nv = newValue / 100
						localStorage.setItem('mVideoVolume', newValue)

						if (nv == 0) {
							this._toggleVolumeBtn.removeClass('active');
						} else {
							this._toggleVolumeBtn.addClass('active');
						}

						this._volumeBar.width(`${newValue}%`);
						this.parent._video.volume = nv;
					}
				}
				unmute() {
					if (this._oldVolume == 0) {
						this._oldVolume = 100
					}
					this.volume(this._oldVolume)
					this._toggleVolumeBtn.addClass('active');
				}
				mute() {
					this._oldVolume = this.volume()
					this.volume(0)
					this._toggleVolumeBtn.removeClass('active');
				}
				toggleVolume() {
					if (this.parent._video.volume == 0) {
						this.unmute();
					} else {
						this.mute();
					}
				}
			}


			this.progress = new Progress(this);

			if (this.isMobileDevice()) {
				this._video.volume = 1;
				this._volumeCont.hide();
				this._positionCont.css('grid-template-columns', 'max-content auto max-content')

				$('*').each(function() {
					var $el = $(this);
					var hoverStyles = $el.attr('style') || '';
					var cssRules = $el.css('pointer-events');
			
					if (hoverStyles.includes('hover')) {
						$el.attr('style', hoverStyles.replace(/:hover.*?{.*?}/g, ''));
					}
			
					$el.css('pointer-events', 'none');
				});
			} else {
				this.volume = new Volume(this);
			}

			this.initAutoHideControls();


			$(document).on('keydown', (e) => {
				if (e.keyCode == 39) {
					this.progress.rewindVideo(10)
				} else if (e.keyCode == 37) {
					this.progress.rewindVideo(-10)
				} else if (e.keyCode == 38) {
					let vol = this.volume.volume();
					this.volume.volume(Math.min(vol + 5, 100));
				} else if (e.keyCode == 40) {
					let vol = this.volume.volume();
					this.volume.volume(Math.max(vol - 5, 0));
				} else if (e.keyCode == 32 || e.keyCode == 75) {
					this.togglePlay()
				} else if (e.keyCode == 70) {
					this.toggleFullscreen()
				}
			});

			this._video.addEventListener('play', () => {
				this._togglePlayBtn.addClass('active');
			});
			this._video.addEventListener('pause', () => {
				this._togglePlayBtn.removeClass('active');
			});
		}

		play() {
			this._video.play();
		}
		pause() {
			this._video.pause();
			this._togglePlayBtn.removeClass('active');
		}
		togglePlay() {
			if (this._video.paused) {
				this.play();
			} else {
				this.pause();
			}
		}

		setSrc(src) {
			this._video.src = src
			this.pause()
			this.progress.getStorageProgress(this._video.src)
		}
		getSrc() {
			return this._video.src
		}

		setList(li) {
			for (let index = 0; index < li.length; index++) {
				const element = li[index];
				
				var el = $('<div>', {
					'class': 'm-video-selector-episode',
					'data-url': element
				}).text(`Серия ${index+1}`);

				this.slideIndex++;
				this._videoSelectorWrapper.slick('slickAdd', el.get(0));
			}
			$(this._episodeSelector()[0]).click()
		}

		fullscreen() {
			const videoElement = this._video.parentElement;
			if (videoElement.requestFullscreen) {
				videoElement.requestFullscreen();
			} else if (videoElement.webkitRequestFullscreen) {
				videoElement.webkitRequestFullscreen();
			} else if (videoElement.msRequestFullscreen) {
				videoElement.msRequestFullscreen();
			}
			this._toggleFullscreenBtn.addClass('active');
		}
		minimize() {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			this._toggleFullscreenBtn.removeClass('active');
		}

		toggleFullscreen() {
			if (!document.fullscreenElement) {
				this.fullscreen()
			} else {
				this.minimize()
			}
		}

		initAutoHideControls() {
			this._controls = $('#mVideoControls, #mVideoSelector');
			this._hideTimeout = null;
		
			const showControls = () => {
				this._controls.removeClass('hidden');
				this.resetHideTimer();
			};
		
			const hideControls = () => {
				if (!this._video.paused) {
					this._controls.addClass('hidden');
				}
			};
		
			this.resetHideTimer = () => {
				clearTimeout(this._hideTimeout);
				this._hideTimeout = setTimeout(hideControls, 3000);
			};
		
			this._videoWrapper.on('mousemove touchstart click', showControls);
		
			$(this._video).on('pause', () => {
				clearTimeout(this._hideTimeout);
				this._controls.removeClass('hidden');
			});
		
			$(this._video).on('play', () => {
				this.resetHideTimer();
			});
		
			if (!this._video.paused) {
				this.resetHideTimer();
			}
		}

		isMobileDevice() {
			return window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
		}
	}

	var player = new MVideo();
	player.setList(window.videos())
});