class Api::ChannelsController < ApplicationController
    def index
        @channels = Channel.all

        render :channels
    end

    def show
    end

    def create
        @channel = Channel.new(channel_params)

        if @channel.save
            render :channel
        else
            render json: @channel.errors.full_messages, status: 404
        end
    end

    def update
    end

    def destroy
    end

    def channel_params
        params.require(:channel).permit(:server_id, :title)
    end
end
