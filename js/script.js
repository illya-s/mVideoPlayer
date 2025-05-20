$(document).ready(function () {
	class Build {
		constructor(el) {
			this.element = el;

			this.wrapper = this.createPlayer();
		}

		createPlayer() {
			const wrapper = $(this.element).attr({
				'class': 'm-video-wrapper',
				'id': 'mVideoWrapper',
			})

			const video = $('<video>', {
				'class': 'm-video',
				'id': 'm-video',
				'preload': 'auto'
			})

			wrapper.append(video);

			const videoSelectorWrapper = $('<div>', {
				'id': 'mVideoSelectorWrapper',
				'class': 'm-video-selector'
			});

			const voiceoverSelect = $('<select>', {
				'id': 'mVideoVoiceoverSelect',
				'class': 'm-video-voiceover-select'
			});
			videoSelectorWrapper.append(voiceoverSelect);

			const episodeSlider = $('<div>', {
				'class': 'm-video-selector-episode-slider'
			});
			const episodeList = $('<div>', {
				'class': 'm-video-selector-episode-list'
			}).hide();
			episodeSlider.append(episodeList);
			videoSelectorWrapper.append(episodeSlider);

			wrapper.append(videoSelectorWrapper);



			// --- Areas ---
			const videoAreas = $('<div>', {
				'class': 'video-areas'
			});

			// Rewind Left Area
			const rewindLeftArea = $('<div>', {
				'id': 'mVideoRewindLeftArea',
				'class': 'video-rewind-area',
				'data-val': '-10'
			});
			const rewindLeftArrow = this.createLeftArrow();
			rewindLeftArea.append(rewindLeftArrow);
			videoAreas.append(rewindLeftArea);

			// Toggle Play Area
			const togglePlayArea = $('<div>', {
				'id': 'mVideoTogglePlayArea',
				'class': 'video-toggle-play-area'
			});
			videoAreas.append(togglePlayArea);

			// Rewind Right Area
			const rewindRightArea = $('<div>', {
				'id': 'mVideoRewindRightArea',
				'class': 'video-rewind-area',
				'data-val': '10'
			});
			const rewindRightArrow = this.createRightArrow();
			rewindRightArea.append(rewindRightArrow);
			videoAreas.append(rewindRightArea);

			wrapper.append(videoAreas);

			// Play Button

			const playBtn = $('<div>', {
				'id': 'mVideoBigPlayBtn',
				'class': 'toggle-play-btn video-big-play-btn'
			});

			playBtn.append(this.createPauseSVG());
			playBtn.append(this.createPlaySVG());
			wrapper.append(playBtn);

			// Video Loader
			wrapper.append(this.createLoader());

			// Video Controls
			wrapper.append(this.createControls());

			return wrapper
		}

		createLeftArrow() {
			const svg = `<svg width="385" height="448" viewBox="0 0 385 448" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0301 180.567C-8.52725 209.501 -1.65372 247.239 28.7885 266.523C114.943 321.099 201.204 375.507 287.426 429.975C292.889 433.425 298.309 436.953 303.879 440.223C339.729 461.269 384.385 436.149 384.443 394.622C384.602 281.33 384.554 168.038 384.462 54.7469C384.438 25.6909 363.223 2.73773 334.308 0.203926C323.413 -0.750775 313.345 2.22522 303.892 7.69053C247.533 40.274 191.134 72.7881 134.754 105.336C100.177 125.297 65.5013 145.092 31.1339 165.407C24.5451 169.302 19.1862 175.277 13.0301 180.567Z" fill="white"/></svg>`

			const arrow = $('<div>', {
				'class': 'video-rewind-arrow'
			}).append(svg, svg, svg);

			return arrow;
		}
		createRightArrow() {
			const svg = `<svg width="385" height="448" viewBox="0 0 385 448" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M371.97 180.567C393.527 209.501 386.654 247.239 356.212 266.523C270.057 321.099 183.796 375.507 97.5735 429.975C92.111 433.425 86.6908 436.953 81.1208 440.223C45.2705 461.269 0.614798 436.149 0.556616 394.622C0.397879 281.33 0.446417 168.038 0.538176 54.7469C0.561712 25.6909 21.7766 2.73773 50.6919 0.203926C61.5868 -0.750775 71.6546 2.22522 81.1078 7.69053C137.467 40.274 193.866 72.7881 250.246 105.336C284.823 125.297 319.499 145.092 353.866 165.407C360.455 169.302 365.814 175.277 371.97 180.567Z" fill="white"/></svg>`

			const arrow = $('<div>', {
				'class': 'video-rewind-arrow'
			}).append(svg, svg, svg);

			return arrow;
		}

		createPauseSVG() {
			return `<svg class="pause" width="513" height="513" viewBox="0 0 513 513" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M436.97 214.067C458.527 243.001 451.654 280.739 421.212 300.023C335.057 354.599 248.796 409.007 162.574 463.475C157.111 466.925 151.691 470.452 146.121 473.722C110.271 494.769 65.6148 469.649 65.5566 428.122C65.3979 314.83 65.4464 201.538 65.5382 88.2468C65.5617 59.1908 86.7766 36.2376 115.692 33.7038C126.587 32.7491 136.655 35.7251 146.108 41.1904C202.467 73.7739 258.866 106.288 315.246 138.835C349.823 158.796 384.499 178.591 418.866 198.907C425.455 202.802 430.814 208.777 436.97 214.067Z" fill="currentColor"/></svg>`;
		}
		createPlaySVG() {
			return `<svg class="play" width="513" height="513" viewBox="0 0 513 513" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M169.489 481.5C151.163 481.5 133.334 481.53 115.506 481.493C86.4222 481.434 65.5215 460.672 65.5132 431.686C65.4802 315.551 65.4796 199.417 65.5136 83.282C65.5221 54.3058 86.4444 33.5488 115.524 33.5057C135.185 33.4765 154.847 33.4922 174.508 33.5019C204.973 33.5169 225.493 53.9428 225.495 84.3046C225.506 199.606 225.503 314.908 225.497 430.21C225.496 461.262 205.168 481.49 173.986 481.5C172.653 481.5 171.32 481.5 169.489 481.5Z" fill="currentColor"/><path d="M289.5 190.5C289.501 154.01 289.413 118.02 289.534 82.0302C289.611 59.1078 304.243 40.5063 326.453 35.0026C330.598 33.9757 334.993 33.5961 339.277 33.5648C359.271 33.419 379.266 33.4786 399.26 33.5051C428.675 33.5442 449.483 54.2294 449.49 83.5562C449.516 199.524 449.517 315.492 449.488 431.459C449.481 460.775 428.658 481.453 399.236 481.495C379.575 481.523 359.914 481.512 340.253 481.497C310.167 481.475 289.512 460.917 289.506 430.933C289.489 350.955 289.5 270.978 289.5 190.5Z" fill="currentColor"/></svg>`;
		}

		createLoader() {
			const loader = $('<div>', {
				'id': 'mVideoLoader',
				'class': 'video-loader'
			});

			const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
				<linearGradient id="a12">
					<stop offset="0" stop-color="#FFFFFF"></stop>
					<stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop>
				</linearGradient>
				<circle fill="none" stroke="url(#a12)" stroke-width="30" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center">
					<animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="0.8" values="360;-324;-288;-252;-216;-180;-144;-108;-72;-36" repeatCount="indefinite"></animateTransform>
				</circle>
			</svg>`

			loader.append(svg);
			return loader;
		}

		createControls() {
			const controls = $('<div>', {
				'id': 'mVideoControls',
				'class': 'video-controls'
			});

			const togglePlayBtn = $('<div>', {
				'id': 'mVideoTogglePlayBtn',
				'class': 'toggle-play-btn'
			})

			togglePlayBtn.append(this.createPauseSVG());
			togglePlayBtn.append(this.createPlaySVG());



			const videoPositionCont = $('<div>', {
				'class': 'video-position-cont'
			})


			const videoCurrentTime = $('<div>', {
				'id': 'mVideoCurrentTime',
				'class': 'video-current-time'
			}).text('00:00')

			const videoProgress = $('<div>', {
				id: 'mVideoProgress',
				class: 'video-progress'
			})
			const videoHoverTime = $('<div>', {
				id: 'mVideoHoverTime',
				class: 'video-hover-time'
			}).text('00:00')
			const videoHoverProgress = $('<div>', {
				id: 'mVideoHoverProgress',
				class: 'video-hover-progress'
			})
			const videoProgressBar = $('<div>', {
				id: 'mVideoProgressBar',
				class: 'video-progress-bar'
			})
			videoProgress.append(videoHoverTime, videoHoverProgress, videoProgressBar)

			const videoDuration = $('<div>', {
				id: 'mVideoDuration',
				class: 'video-duration'
			}).text('00:00')

			const videoVolumeCont = $('<div>', {
				class: 'video-volume-cont'
			})
			const videoToggleVolumeBtn = $('<button>', {
				id: 'mVideoToggleVolumeBtn',
				class: 'video-volume-btn'
			}).append(this.createVolumeSVG(), this.createMuteSVG())
			const videoVolume = $('<div>', {
				id: 'mVideoVolume',
				class: 'video-volume'
			})
			const videoVolumeBar = $('<div>', {
				id: 'mVideoVolumeBar',
				class: 'video-volume-bar'
			})
			videoVolume.html(videoVolumeBar)
			videoVolumeCont.append(videoToggleVolumeBtn, videoVolume)

			videoPositionCont.append(videoCurrentTime, videoProgress, videoDuration, videoVolumeCont)


			const videoToggleFullscreenBtn = $('<button>', {
				id: 'mVideoToggleFullscreenBtn',
				class: 'video-fullscreen-btn'
			}).append(this.createFullscreenSVG(), this.createMinimizeSVG())


			controls.append(togglePlayBtn, videoPositionCont, videoToggleFullscreenBtn);

			return controls;
		}

		createVolumeSVG() {
			return `<svg class="volume" width="513" height="513" viewBox="0 0 513 513" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M261.477 462.588C240.967 466.857 222.707 462.568 208.04 448.376C179.425 420.69 151.497 392.292 123.44 364.036C120.249 360.822 117.145 359.366 112.585 359.526C102.933 359.865 93.2573 359.738 83.5956 359.569C52.8687 359.032 27.7235 333.964 27.4515 303.184C27.182 272.692 27.1785 242.195 27.4551 211.704C27.734 180.954 52.9125 155.947 83.702 155.425C93.8637 155.253 104.034 155.232 114.193 155.447C117.678 155.52 119.998 154.329 122.407 151.903C149.769 124.36 177.307 96.9907 204.662 69.4407C216.333 57.6864 230.341 51.3895 246.772 50.6919C273.759 49.5463 299.765 68.8866 306.373 95.1088C307.736 100.52 308.428 106.249 308.435 111.832C308.556 208.979 308.544 306.125 308.509 403.271C308.499 432.253 290.275 455.324 261.477 462.588Z" fill="white"/>
						<path d="M480.31 202.774C486.441 224.974 488.76 247.224 487.428 269.751C485.563 301.306 476.873 330.985 461.014 358.382C454.043 370.424 438.724 374.162 426.701 367.393C414.591 360.575 410.118 345.551 416.983 332.923C425.113 317.969 431.323 302.313 434.243 285.587C440.406 250.278 435.419 216.548 418.288 184.89C414.141 177.226 412.12 169.59 415.422 161.155C419.3 151.25 426.697 145.521 437.091 144.64C447.723 143.74 456.756 147.923 461.35 157.772C468.17 172.39 473.96 187.489 480.31 202.774Z" fill="white"/>
						<path d="M410.03 242.108C412.082 263.164 410.202 283.292 402.623 302.726C397.28 316.428 383.255 323.174 369.906 318.37C356.766 313.642 349.725 298.992 354.707 285.387C361.561 266.666 361.512 248.231 354.691 229.511C349.726 215.886 356.84 201.252 370.01 196.602C383.434 191.862 397.778 198.443 402.495 212.428C405.699 221.927 407.49 231.904 410.03 242.108Z" fill="white"/>
					</svg>`;
		}
		createMuteSVG() {
			return `<svg class="mute" width="513" height="513" viewBox="0 0 513 513" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M273.487 458.591C250.835 468.811 224.879 465.006 207.516 448.002C178.946 420.023 150.821 391.589 122.608 363.247C120.075 360.702 117.63 359.445 113.939 359.541C103.948 359.801 93.9423 359.74 83.9463 359.577C52.8527 359.07 27.7112 334.08 27.4453 303.029C27.1857 272.702 27.1903 242.369 27.4424 212.042C27.7009 180.95 52.801 155.926 83.8698 155.42C94.1991 155.252 104.538 155.55 114.861 155.233C117.188 155.161 120.031 153.982 121.679 152.347C149.364 124.887 176.931 97.3082 204.446 69.6781C214.754 59.3275 226.864 52.9873 241.502 51.2477C271.084 47.7323 299.317 66.8158 306.433 95.8012C307.841 101.536 308.431 107.61 308.439 113.528C308.559 209.515 308.516 305.502 308.529 401.488C308.532 427.539 297.063 446.576 273.487 458.591Z" fill="white"/>
						<path d="M460.81 271.192C466.644 276.757 471.79 282.207 472.76 290.503C474.037 301.419 469.007 311.575 459.286 316.583C449.496 321.627 438.249 320.248 430.257 312.585C423.893 306.483 417.892 300.002 411.007 292.948C404.573 299.595 398.672 306.018 392.424 312.081C378.212 325.871 355.18 319.684 350.07 300.575C347.591 291.304 349.803 282.774 356.739 275.833C362.726 269.843 368.833 263.973 375.381 257.568C368.81 251.084 362.589 245.119 356.566 238.962C349.004 231.232 347.087 220.074 351.429 210.436C355.703 200.95 365.162 195.068 375.807 195.533C382.158 195.81 387.708 198.234 392.28 202.718C395.373 205.752 398.451 208.802 401.489 211.891C404.522 214.976 407.495 218.119 411.215 221.986C417.673 215.316 423.651 208.708 430.088 202.581C443.906 189.427 466.225 195.242 471.841 213.448C474.762 222.919 472.742 231.573 465.78 238.738C459.753 244.941 453.466 250.89 446.703 257.531C451.539 262.211 456.049 266.577 460.81 271.192Z" fill="white"/>
					</svg>`;
		}

		createFullscreenSVG() {
			return `<svg class="fullscreen" width="513" height="513" viewBox="0 0 513 513" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M183.311 40.2921C201.891 41.4783 216.989 56.4878 218.682 73.9428C220.833 96.1154 205.223 112.58 188.849 115.545C185.925 116.074 182.93 116.468 179.966 116.481C160.806 116.564 141.644 116.649 122.486 116.433C117.967 116.382 116.367 117.583 116.425 122.315C116.663 141.639 116.559 160.967 116.511 180.294C116.464 199.51 102.443 216.244 84.6059 218.485C63.5015 221.136 45.6901 209.136 40.9158 188.905C40.2732 186.182 40.1071 183.292 40.1117 180.48C40.1482 158.158 39.686 135.813 40.521 113.518C41.7695 80.1854 67.0816 50.2625 99.6612 42.5422C104.632 41.3642 109.795 40.4412 114.879 40.3879C137.529 40.1506 160.184 40.2721 183.311 40.2921Z" fill="white"/>
						<path d="M120.506 474.949C81.2291 475.055 53.1663 449.35 44.0984 420.558C42.081 414.152 40.6132 407.298 40.492 400.621C40.0689 377.311 39.8963 353.977 40.5057 330.675C40.963 313.187 56.6145 298.056 73.4785 296.351C95.2364 294.15 111.303 308.195 115.425 325.169C116.2 328.359 116.46 331.742 116.476 335.038C116.572 354.196 116.648 373.357 116.433 392.513C116.383 397.035 117.597 398.632 122.322 398.574C141.644 398.338 160.971 398.445 180.297 398.486C199.729 398.527 216.47 412.96 218.557 430.883C221.154 453.182 207.367 469.971 188.424 474.212C184.898 475.001 181.135 474.907 177.481 474.919C158.656 474.983 139.83 474.949 120.506 474.949Z" fill="white"/>
						<path d="M398.476 178.427C398.476 159.278 398.379 140.617 398.551 121.959C398.588 117.868 397.379 116.406 393.156 116.445C373.831 116.626 354.503 116.547 335.177 116.517C315.55 116.487 298.715 102.558 296.506 84.5786C293.921 63.5374 305.505 46.1559 325.647 41.0962C328.514 40.3758 331.567 40.1064 334.533 40.1095C356.855 40.1329 379.199 39.6777 401.493 40.5236C434.861 41.7897 464.642 66.9851 472.444 99.6617C473.669 104.791 474.583 110.13 474.629 115.381C474.833 138.364 475.107 161.363 474.487 184.333C474.014 201.823 458.375 216.93 441.499 218.651C419.782 220.866 403.52 206.601 399.574 189.783C398.75 186.268 398.819 182.544 398.476 178.427Z" fill="white"/>
						<path d="M398.476 351.5C398.791 342.706 398.331 334.294 399.583 326.144C402.141 309.498 419.041 294.326 440.563 296.29C458.501 297.928 474.051 312.74 474.505 331.218C475.11 355.851 476.132 380.644 474.103 405.13C471.189 440.314 443.825 467.252 410.809 473.472C407.071 474.176 403.232 474.683 399.438 474.694C376.454 474.764 353.458 475.1 330.489 474.477C313.101 474.005 298.021 458.263 296.335 441.329C294.18 419.676 308.45 403.45 325.356 399.542C328.558 398.803 331.931 398.538 335.228 398.522C354.22 398.429 373.215 398.297 392.203 398.592C397.425 398.674 398.69 396.903 398.579 391.982C398.278 378.661 398.476 365.328 398.476 351.5Z" fill="white"/>
					</svg>`;
		}
		createMinimizeSVG() {
			return `<svg class="minimize" width="513" height="513" viewBox="0 0 513 513" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M75.5872 218.8C57.0074 217.614 41.9094 202.605 40.2161 185.15C38.0651 162.977 53.6747 146.513 70.0489 143.548C72.9729 143.018 75.9677 142.624 78.9317 142.612C98.0917 142.528 117.254 142.444 136.411 142.66C140.931 142.711 142.531 141.51 142.473 136.778C142.235 117.454 142.339 98.1252 142.387 78.7984C142.434 59.5821 156.455 42.8486 174.292 40.608C195.396 37.957 213.208 49.9561 217.982 70.1875C218.625 72.9102 218.791 75.8003 218.786 78.6122C218.75 100.935 219.212 123.28 218.377 145.575C217.128 178.907 191.816 208.83 159.237 216.55C154.266 217.728 149.103 218.651 144.019 218.705C121.368 218.942 98.714 218.82 75.5872 218.8Z" fill="white"/>
						<path d="M138.475 296.132C177.752 296.026 205.815 321.731 214.883 350.523C216.9 356.928 218.368 363.783 218.489 370.46C218.912 393.77 219.085 417.104 218.475 440.406C218.018 457.894 202.366 473.025 185.502 474.73C163.745 476.931 147.678 462.886 143.556 445.911C142.781 442.721 142.521 439.339 142.505 436.043C142.409 416.885 142.333 397.724 142.548 378.568C142.598 374.046 141.384 372.449 136.659 372.507C117.337 372.743 98.0095 372.636 78.6841 372.595C59.2523 372.554 42.5112 358.12 40.4242 340.198C37.8273 317.898 51.6137 301.11 70.5571 296.869C74.0829 296.079 77.8455 296.174 81.4999 296.162C100.325 296.098 119.151 296.132 138.475 296.132Z" fill="white"/>
						<path d="M372.54 80.4592C372.54 99.6082 372.637 118.269 372.466 136.927C372.428 141.019 373.637 142.481 377.861 142.441C397.185 142.261 416.513 142.34 435.839 142.369C455.466 142.399 472.301 156.328 474.51 174.308C477.095 195.349 465.511 212.731 445.369 217.79C442.502 218.511 439.449 218.78 436.483 218.777C414.161 218.754 391.817 219.209 369.524 218.363C336.155 217.097 306.374 191.901 298.572 159.225C297.347 154.096 296.433 148.757 296.387 143.506C296.183 120.522 295.909 97.5236 296.53 74.5538C297.002 57.0632 312.641 41.9569 329.517 40.2356C351.234 38.0207 367.496 52.2855 371.442 69.1035C372.266 72.6181 372.197 76.3424 372.54 80.4592Z" fill="white"/>
						<path d="M372.947 419.466C372.632 428.259 373.091 436.672 371.839 444.822C369.282 461.468 352.382 476.64 330.86 474.675C312.921 473.038 297.372 458.225 296.918 439.747C296.313 415.114 295.291 390.321 297.32 365.835C300.234 330.652 327.598 303.714 360.614 297.494C364.352 296.79 368.191 296.283 371.985 296.271C394.969 296.202 417.965 295.866 440.934 296.489C458.322 296.96 473.402 312.702 475.087 329.637C477.243 351.29 462.973 367.516 446.067 371.423C442.865 372.163 439.492 372.427 436.195 372.444C417.203 372.537 398.208 372.669 379.22 372.373C373.998 372.292 372.733 374.063 372.844 378.983C373.144 392.305 372.947 405.637 372.947 419.466Z" fill="white"/>
					</svg>`;
		}
	}

	class MVideo {
		constructor(elem) {
			const build = new Build(elem);

			this._videoWrapper = build.wrapper;
			this._video = $("#m-video").get(0);

			this._positionCont = $('.video-position-cont')

			this._togglePlayBtn = $('#mVideoTogglePlayBtn, #mVideoBigPlayBtn, #mVideoTogglePlayArea');
			this._togglePlayArea = $('#mVideoTogglePlayArea')

			this._volumeCont = $('.video-volume-cont')

			this._toggleFullscreenBtn = $('#mVideoToggleFullscreenBtn');

			this._togglePlayBtn.on('click', () => this.togglePlay());
			this._toggleFullscreenBtn.on('click', () => this.toggleFullscreen());

			class SwitchControls {
				constructor(parent) {
					this.parent = parent;

					this._data = []

					this._videoSelectorWrapper = $('.m-video-selector-episode-list');
					this._videoVoiceoverSelect = $('#mVideoVoiceoverSelect');
					this._episodeSelector = function() {
						return $('.m-video-selector-episode')
					};


					this.slideIndex = 0;
					this.currentSlickMode = null;
					this.initEpisodeSlider()

					const observer = new ResizeObserver((entries) => {
						this.updateEpisodeSlider();
					});
					observer.observe(this.parent._videoWrapper[0]);

					this._episodeLastSelector = null;
					var isDragging = false;
					this._videoSelectorWrapper.on('mousedown touchstart', function () {
						isDragging = false;
					});

					this._videoSelectorWrapper.on('mousemove touchmove', function () {
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

							this.parent.src($(e.target).data('url'))
						}
					});

					$(document).on('fullscreenchange', () => {
						this._videoSelectorWrapper.slick('setPosition');
					});

					this._videoVoiceoverSelect.on('change', (e) => {
						const id = this._videoVoiceoverSelect.val();
						const obj = this._data.find(obj => obj.id === id)
						this.setList(obj.list)
					})
				}


				initEpisodeSlider() {
					if (this.parent._videoWrapper.width() >= 600) {
						this.slideLen = 6
					} else if (this.parent._videoWrapper.width() >= 420) {
						this.slideLen = 4
					} else {
						this.slideLen = 2
					}

					this._videoSelectorWrapper.slick({
						infinite: false,

						arrows: true,
						prevArrow: `<div class="prevArrow"><svg width="21" height="34" viewBox="0 0 21 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 31L4 17L18 3" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg></div>`,
						nextArrow: `<div class="nextArrow"><svg width="21" height="34" viewBox="0 0 21 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L17 17L3 31" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg></div>`,

						slidesToShow: this.slideLen,
						slidesToScroll: this.slideLen,
					});

					this._videoVoiceoverSelect.change()
				}

				updateEpisodeSlider() {
					const containerWidth = this.parent._videoWrapper.width();
					let newMode;

					if (containerWidth >= 720) newMode = 'desktop';
					else if (containerWidth >= 480) newMode = 'tablet';
					else newMode = 'mobile';

					if (newMode !== this.currentSlickMode) {
						this._videoSelectorWrapper.slick('unslick');
						this._videoSelectorWrapper.html('')
						this.initEpisodeSlider();
					}
				}


				loadData(objs) {
					this._data = objs

					objs.forEach(element => {
						const opt = $('<option>').val(element.id).text(element.name)
						this._videoVoiceoverSelect.append(opt)
					});

					this._videoVoiceoverSelect.change()
				}



				clearList() {
					this._episodeSelector().each((i, element) => {
						this._videoSelectorWrapper.slick('slickRemove', 0);
					});
					this.parent.src("")
					this._videoSelectorWrapper.hide();
				}
				setList(li) {
					this.clearList()

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
					this._videoSelectorWrapper.show();
					this._videoSelectorWrapper.slick('setPosition');
				}
			}

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

					if (!this.parent.isMobileDevice()) {
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

						this._progressBtn.on('mousemove', (e) => {
							const offset = this._progressBtn.offset();
							const relativeX = e.pageX - offset.left;
							const progressWidth = this._progressBtn.width();
							const duration = this.parent._video.duration;
			
							const hoverTime = (relativeX / progressWidth) * duration;
			
							this.setHoveProgress(relativeX, hoverTime)
						});
						this._progressBtn.on('mouseleave', (e) => {
							this.hideHoverProgress();
						});
					} else {
						this._hover_time.remove();
						this._hover_progress.remove();

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
					}

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

				setHoveProgress(relativeX, hoverTime) {
					this._hover_progress.width(relativeX);
					this._hover_time.text(this.formatTime(hoverTime));
					this._hover_time.css({
						left: relativeX + 'px',
						display: 'block'
					});
				}
				hideHoverProgress() {
					this._hover_time.hide();
					this._hover_progress.width(0)
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
						this.setStorageProgress(this.parent.src(), newValue)

						const duration = this.parent._video.duration;
						const newTime = (duration * newValue) / 100;

						const progressWidth = this._progressBtn.width();
						const pos = (newValue * progressWidth) / 100;

						this._progressBar.width(pos);
						this.parent._video.currentTime = newTime;
					}
				}


				onLoadMetaData() {
					const savedTime = this.getStorageProgress(this.parent.src());
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

			this.switchControls = new SwitchControls(this);

			this.progress = new Progress(this);

			if (this.isMobileDevice()) {
				this._video.volume = 1;
				this._volumeCont.hide();
				this._positionCont.css('grid-template-columns', 'max-content auto max-content')

				$('*').each((e) => {
					var $el = $(e.target);
					var styles = $el.attr('style') || '';

					if (styles.includes('hover')) {
						$el.attr('style', styles.replace(/:hover.*?{.*?}/g, ''));
					}
				});
			} else {
				this.volume = new Volume(this);
			}

			this.initAutoHideControls();


			$(document).on('keydown', (e) => {
				if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Space", "KeyK", "KeyF"].includes(e.code)) {
					e.preventDefault();
				}

				switch (e.code) {
					case 'ArrowRight':
						this.progress.rewindVideo(10)
						break;
					case 'ArrowLeft':
						this.progress.rewindVideo(-10)
						break;
					case 'ArrowUp':
						vol = this.volume.volume();
						this.volume.volume(Math.min(vol + 5, 100));
						break;
					case 'ArrowDown':
						vol = this.volume.volume();
						this.volume.volume(Math.max(vol - 5, 0));
						break;
					case 'Space': case 'KeyK':
						this.togglePlay()
						break;
					case 'KeyF':
						this.toggleFullscreen()
						break;
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
			this._video.paused ? this.play() : this.pause()
		}

		src(value) {
			if (value === undefined) {
				return this._video.src
			} else if (value == "") {
				this._video.removeAttribute('src');
			} else {
				this._video.src = value
				this.pause()
				this.progress.getStorageProgress(this._video.src)
			}
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
			this._controls = $('#mVideoControls, #mVideoSelectorWrapper');
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

	window.MVideo = MVideo;
});